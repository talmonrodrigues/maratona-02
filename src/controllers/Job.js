const Profile = require('../model/Profile');
const Job = require('../model/Job');
const JobService = require('../utils/JobService');

module.exports = {
   async create(req, res) {
      const jobs = await Job.get();
      const profile = await Profile.get();

      let jobTotalHours = 0;

      const updatedJobs = await jobs.map(job => {
         const remaining = JobService.remainingDays(job);
         const status = remaining <= 0 ? 'done' : 'progress';

         jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours;
      });

      const freeHours = profile['hours-per-day'] - jobTotalHours;

      if (req.session.user) {
         return res.render('job', { freeHours: freeHours });
      } else {
         return res.redirect('/');
      }
   },
   async save(req, res) {
      const profile = await Profile.get();

      await Job.create({
         name: req.body.name,
         'daily-hours': req.body['daily-hours'],
         'total-hours': req.body['total-hours'],
         created_by: profile.id,
         created_at: Date.now(),
      });

      return res.redirect('/');
   },
   async show(req, res) {
      const jobId = req.params.id;
      const jobs = await Job.get();

      const job = jobs.find(job => Number(job.id) === Number(jobId));

      if (!job) {
         return res.redirect('/404');
      }

      const profile = await Profile.get();

      job.budget = JobService.calulateBudget(job, profile['value-hour']);

      if (req.session.user) {
         return res.render('job-edit', { job });
      } else {
         return res.redirect('/');
      }
   },
   async update(req, res) {
      const jobId = req.params.id;

      const updatedJob = {
         name: req.body.name,
         'total-hours': req.body['total-hours'],
         'daily-hours': req.body['daily-hours'],
      };

      await Job.update(updatedJob, jobId);

      return res.redirect('/job/' + jobId);
   },
   async delete(req, res) {
      const jobId = req.params.id;

      await Job.delete(jobId);

      return res.redirect('/');
   },
   error(req, res) {
      return res.render('./parts/404');
   },
};
