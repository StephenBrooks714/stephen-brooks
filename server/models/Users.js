const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema ({
    username: {
        type: String,
        unique: [true,'Please provide username'],
        required: true
    },
    bio: String,
    portfolio: String,
    name: {
        type: String,
        unique: [true,'Please provide username'],
        required: true
    },
    password: {
        type: String,
        required: [true,'Please provide password']
    },
    email: {
        type: String,
        required: [true,'Please provide an email']
    },
    joinedDate: {
        type: Date,
        default: new Date
    }
})

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save',function(next){
    const user = this
    bcrypt.hash(user.password, 10,(error, hash)=>{
        user.password = hash
        next()
    })
})

const User = mongoose.model('User',UserSchema);
module.exports = User;