const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const SitemapGenerator = require('sitemap-generator');
const bodyParser = require('body-parser');
const flash = require('connect-flash')
const fileUpload = require('express-fileupload')
const session = require('express-session');
const router = require('./server/routes/router')

require('dotenv').config();
const generator = SitemapGenerator('http://localhost:8080', {
    stripQuerystring: false
});
// register event listeners
generator.on('done', () => {
    // sitemaps created
});

// start the crawler
generator.start();

app.use(express.static(path.join(__dirname,('public'))))
app.use(express.static(path.join(__dirname,('node_modules/mdbootstrap-pro/css'))))
app.use(express.static(path.join(__dirname,('node_modules/mdbootstrap-pro/css/modules'))))
app.use(express.static(path.join(__dirname,('node_modules/mdbootstrap-pro/js'))))
app.use(express.static(path.join(__dirname,('node_modules/mdbootstrap-pro/js/modules'))))
app.use(express.static(path.join(__dirname,('public'))))
app.set('view engine', 'ejs')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash())
app.use(fileUpload())

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false
}));

global.loggedIn = null;

app.use("*",(req,res,next)=>{
    loggedIn = req.session.userId
    next()
})

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
if(mongoose){
    console.log('Db connected')
} else {
    console.log('No Db connected')
}

const port = process.env.PORT;
app.listen(port || 8000,() => {
    console.log(`App listening on ${port}`)
})

app.use('/', router)

app.use(function(req, res, next){
    res.status(404).render('notFound.ejs', {title: "Sorry, page not found"});
});