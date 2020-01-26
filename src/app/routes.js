const express = require('express');
const routes = express.Router();

const User = require('./controllers/userController')
const Schedules = require('./controllers/schedulesController')


routes.post('/user', User.create);
routes.post('/login', User.login);
routes.get('/user', User.getUsers);

routes.post('/schedules', Schedules.create)
routes.get('/schedules', Schedules.get)
routes.get('/schedules/:id', Schedules.getSchedulesUser)



//routes.post('/page', Page.create);

//routes.get('/page/:id', Page.getPage);
//routes.put('/page/:id', Page.update);
//routes.delete('/page/:id', Page.delete);

module.exports = routes;
