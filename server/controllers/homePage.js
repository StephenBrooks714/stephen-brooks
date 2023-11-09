const HomeBlogsDb = require("../models/ArticlePost");
module.exports = async (req, res) => {
    const blogs = await HomeBlogsDb.find({}).sort({_id: -1}).populate('userid')
    res.render("index", {
        title: "Home page for Stephen's Portfolio & Blogs.",
        blogs
    })
}