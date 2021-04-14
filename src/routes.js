const express = require('express');
const routes = express.Router();
const ProfileController = require('./controllers/Profile');
const JobController = require('./controllers/Job');
const DashboardController = require('./controllers/Dashboard');

routes.get('/', DashboardController.index);
routes.all('/', DashboardController.auth);
routes.post('/', DashboardController.auth);
routes.get('/job', JobController.create);
routes.post('/job', JobController.save);
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);
routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);
routes.get('/404', JobController.error);

module.exports = routes;
