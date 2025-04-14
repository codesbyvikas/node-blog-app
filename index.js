const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");



const userRoute = require("./routes/user");4
const blogRoute = require("./routes/blog");
const checkForAuthCookie = require("./middlewares/auth");
const Blog = require("./models/blog");



const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/blogged')
.then(console.log("MongoDB connected"))

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static(path.resolve('./public')));


app.get("/", async (req,res) =>{
    const allBlogs = await Blog.find({})

    res.render("home", {
        user:req.user,
        blogs: allBlogs,
    });
});

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
