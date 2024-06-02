const express = require('express')
const Router = express.Router()
const userController = require('../controllers/user.controller')

Router.post('/signUp', userController.register);
Router.post('/signIn', userController.login);
Router.get('/getAllUsers', userController.getAllUsers);
//route.get('/', userController.getAll);

module.exports = Router;