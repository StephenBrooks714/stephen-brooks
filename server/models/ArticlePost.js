const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ArticlePostSchema = new Schema ({
    title: String,
    summary: String,
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

const ArticlePost = mongoose.model('ArticlePost', ArticlePostSchema);
module.exports = ArticlePost;