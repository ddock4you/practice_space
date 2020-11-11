const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { auth } = require("./middleware/auth");
const { User } = require("./models/user");

mongoose
    .connect(
        "mongodb+srv://ddock4you:tmdgus123!@cluster0.wlayg.mongodb.net/boilerplate?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    .then(() => console.log("Mongo DB Connected"))
    .catch((err) => console.log(err));

const PORT = 5001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.send("홈 화면"));
app.post("/register", (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
        if (err)
            return res.json({
                joinSuccess: false,
                err,
            });

        return res.status(200).json({
            joinSuccess: true,
        });
    });
});
app.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        console.log(user);
        if (!user) return res.json({ loginSuccess: false });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false });

            user.generateToken((err, user) => {
                if (err) return res.json({ loginSuccess: false, err });
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true });
            });
        });
    });
});

app.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        lastname: req.user.lastemail,
        role: req.user.role,
        image: req.user.image,
    });
});

app.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err) return res.json({ success: false });
        res.status(200).json({ success: true });
    });
});

app.listen(PORT, (req, res) => console.log(`${PORT} PORT Server Start`));
