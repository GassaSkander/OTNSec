const express = require('express')
const cors = require('cors')
const app = express()

//? Routes
const usersRoutes = require('./routes/user.route');
const rolesRoutes = require('./routes/Api');

const db = require("./config/database");

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST'],
    // allowedHeaders: ['Authorization']
};

app.use(cors(corsOptions));

app.use('/users', usersRoutes);
app.use('/roles', rolesRoutes);




// test data received
app.post('/*', (req, res) => {
    // Handle POST request
    // Example: Echo back the received data
    const requestData = req.body;
    res.json({ message: 'Data received', data: requestData });
});

db.connect();

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// // index.js
// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello, World!\n');
// });


