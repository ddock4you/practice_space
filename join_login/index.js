const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./models/user");

const app = express();
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

app.get("/", (req, res) => res.send("홈 화면"));
app.post("/register", (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(() => {
            return res.send("회원가입 성공");
        })
        .catch((err) => {
            return console.log(err);
        });
});

app.listen(PORT, (req, res) => console.log(`${PORT} PORT Server Start`));
