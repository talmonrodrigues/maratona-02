const Job = require('../model/Job');
const Profile = require('../model/Profile');
const SegUser = require('../model/SegUser');
const JobService = require('../utils/JobService');

module.exports = {
   async index(req, res) {
      const jobs = await Job.get(); //a constante Jobs é uma variável para importar os dados do model Job.
      const profile = await Profile.get(); //a constante profile é uma variável para importar os dados do model Profile.

      let statusCount = {
         progress: 0,
         done: 0,
         total: jobs.length,
      };

      //Total de horas por dia de cada job em "progress"
      let jobTotalHours = 0;

      const updatedJobs = await jobs.map(job => {
         const remaining = JobService.remainingDays(job);
         const status = remaining <= 0 ? 'done' : 'progress';

         //Somando a quantidade de status
         statusCount[status] += 1;

         //Total de horas por dia de cada job em "progress"
         jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours;

         //É o mesmo calculo da linha acima
         //  if (status == 'progress') {
         //     jobTotalHours += Number(job['daily-hours']);
         //  }

         return {
            ...job,
            remaining,
            status,
            budget: JobService.calulateBudget(job, profile['value-hour']),
         };
      });

      //Qtd de hora que quero trabalhar menos a quantidade de hora/dia de caba job em "progress"
      const freeHours = profile['hours-per-day'] - jobTotalHours;

      const fristName = profile.name;
      const fristLastname = profile.lastname;

      const nameProfile = fristName.substring(0, 1) + fristLastname.substring(0, 1);

      if (req.session.user) {
         res.render('index', { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours, nameProfile: nameProfile });
      } else {
         return res.render('login');
      }
   },
   async login(req, res) {
      const segUser = await SegUser.get();
      const user = segUser.username;
      const password = segUser.password;

      if (req.body.password == password && req.body.user == user) {
         req.session.user = user;
         res.redirect('/');
      } else {
         return res.render('login');
      }
   },
};
