const express = require('express');
const { exec } = require('child_process');

exports.triggerScan = async (req, res) => {
    exec('bash ~/Documents/cloneRep.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send(`Stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        res.send(`Script executed successfully: ${stdout}`);
    });
}