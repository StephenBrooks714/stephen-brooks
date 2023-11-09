const mongoose = require("mongoose");
const Schema = mongoose.Schema

const CoursePostSchema = new Schema ({
    title: String,
    code: {
        type: Array,
        default: String
    },
    referenceId: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: String,
    body: String,
    datePosted:{
        type: Date,
        default: new Date()
    },
})

const CoursePost = mongoose.model('CoursePost', CoursePostSchema);
module.exports = CoursePost;