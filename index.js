const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user");
const checkForAuthCookie = require("./middlewares/auth");

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/blogged')
.then(console.log("MongoDB connected"))

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));

app.get('/', (req, res) =>{
    console.log()
    res.render("home", {
        user: req.user,
    });
})

app.use('/user',userRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
