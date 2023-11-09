const express = require("express");
const router = express.Router();
const cache = require("../cache/mcache");

const homeController = require("../controllers/homePage");
const aboutController = require("../controllers/aboutPage");
const contactController = require("../controllers/contactPage");
const sendFormController = require("../controllers/sendContactForm");
const courseController = require("../controllers/coursePage");
// admin account
const registerController = require("../controllers/registerPage");
const storeUserController = require("../controllers/storeUser");
const loginController = require("../controllers/loginPage");
const loginUserController = require("../controllers/loginUser");
const logoutController = require("../controllers/logoutUser");
// blogs
const NewPostController = require("../controllers/newPostPage");
const storePostController = require("../controllers/storePostData");
const blogsController =require("../controllers/blogsPage");
const deletePostController = require("../controllers/deletePost");

const contactForm = require("../middleware/validateContactForm");
const loggedInAlready = require("../middleware/ifLoggedInAlready");
const auth = require("../middleware/ifAuthorized");
const blog = require("../middleware/validateBlogsForm");

router.get("/", cache(2), homeController);
router.get("/about", cache(2), aboutController);
router.get("/contact", cache(2), contactController);
router.post("/send/form", contactForm, sendFormController)
router.get("/courses", cache(2), courseController);
// admin account
router.get("/register", loggedInAlready, registerController);
router.post("/store/user", storeUserController);
router.get("/login", loggedInAlready, loginController);
router.post("/login/user", loginUserController);
router.get("/logout", logoutController);
// articles
router.get("/newPost", auth, NewPostController);
router.post("/store/post", blog, storePostController);
router.get("/blogs", cache(2), blogsController);
router.get("/delete/post/:id", auth, deletePostController);

module.exports = router;