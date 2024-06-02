const mongoose = require('mongoose');
const role = require('./role.model');
var userSchema = new mongoose.Schema(

    {
        fullName: {
            type: String,
            required: [true, 'fullname is not provided']
        },
        email: {
            type: String,
            required: [true, 'email is not provided'],
            unique: [true, "email already exists in database!"],
            lowercase: true,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            }

        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "role",
            default: "6636c94b604e271789715920"
        },
        password: {
            type: String,
            required: [true, 'password is not provided'],
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('user', userSchema)