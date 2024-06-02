const express = require('express')
const Router = express.Router();
//models
const Role = require('../models/role.model')

//? Add role
Router.post('/add', async (req, res) => {
    const { name } = req.body;
    const role = new Role({ name });
    try {
        await role.save();
        res.send(role);
    }catch(err){
        res.status(500).send(err)
    }

});

//? Get all roles
Router.get('/show', async(req, res) => {
    try {
        const roles = await Role.find({});
        res.send(roles);
    }catch(err){
        res.status(500).send(err)
    }
})

module.exports = Router;