const User = require('../models/user.model')
const Role = require('../models/role.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//? Register
exports.register = async (req, res) => {
    try {
        localUser = new User();
        const { fullName, role, email, password } = req.body;
        const localRole = role != null ? await Role.findOne({ name: role }) : localUser.role;

        if (!(email && password && fullName && (role == localRole.name))) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User already exist. Please login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullName,
            role: localRole._id,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "10h",
            }
        );

        user.token = token;
        res.status(201).json(user);

    } catch (err) {
        console.log(err);
    }
}



//? Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email }).populate("role", "name");
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email, role: user.role },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "10h",
                }
            );
            // save user token
            user.token = token;

            // user
            res.status(200)
                .json({
                    user: user,
                    accessToken: token,
                    message: "Login successfull"
                });
        } else {
            res.status(401).send("Invalid Credentials, Unauthorized");
        }

    } catch (err) {
        console.log(err);
        res.status(500);
    }
}

//? Get all
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (err) {
        console.log(err);
    }
}


//? 
exports.getUsersWithRoles = async (req, res, next) => {
    try {
        const users = await User.find().populate('role');
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
    }
}