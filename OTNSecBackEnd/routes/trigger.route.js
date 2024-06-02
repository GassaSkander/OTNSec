const express = require('express')
const Router = express.Router()
const userController = require('../controllers/trigger.controller')

Router.get('/execute-script', userController.register);