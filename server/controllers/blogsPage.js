// database
const BlogsDb = require('../models/ArticlePost');

module.exports = async (req, res) => {
    const blogs = await BlogsDb.find({}).sort({_id: -1}).populate('userid')
    res.render("blogs", {
        title: "Blogs page created by Stephen Brooks.",
        blogs
    })
}