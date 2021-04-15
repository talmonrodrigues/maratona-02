const Profile = require('../model/Profile');

module.exports = {
   async index(req, res) {
      const profile = await Profile.get();

      const fristName = profile.name;
      const fristLastname = profile.lastname;

      const nameProfile = fristName.substring(0, 1) + fristLastname.substring(0, 1);

      if (req.session.user) {
         return res.render('profile', { profile: profile, nameProfile: nameProfile });
      } else {
         return res.redirect('/');
      }
   },

   async update(req, res) {
      //req.body para pegar os dados
      const data = req.body;

      //definir quantas semenas tem no ano: 52
      const weeksPerYear = 52;

      //remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
      const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;

      //quantas horas por semana estou trabalhando
      const weekTotalHours = data['hours-per-day'] * data['days-per-week'];

      //total de horas trabalhadas no mes
      const monthlyTotalHours = weekTotalHours * weeksPerMonth;

      //o valor da hora
      const valueHour = data['monthly-budget'] / monthlyTotalHours;

      const profile = await Profile.get();

      await Profile.update({
         ...profile,
         ...req.body,
         'value-hour': valueHour,
      });

      return res.redirect('/profile');
   },

   signup(req, res) {
      return res.render('sign-up');
   },

   async create(req, res) {
      const data = req.body;

      const weeksPerYear = 52;

      const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;

      const weekTotalHours = data['hours-per-day'] * data['days-per-week'];

      const monthlyTotalHours = weekTotalHours * weeksPerMonth;

      const valueHour = data['monthly-budget'] / monthlyTotalHours;

      await Profile.create({
         name: req.body.name,
         lastname: req.body.lastname,
         username: req.body.username,
         password: req.body.password,
         avatar: req.body.avatar,
         'monthly-budget': req.body['monthly-budget'],
         'hours-per-day': req.body['hours-per-day'],
         'days-per-week': req.body['days-per-week'],
         'vacation-per-year': req.body['vacation-per-year'],
         'value-hour': valueHour,
      });

      return res.redirect('/');
   },
};
