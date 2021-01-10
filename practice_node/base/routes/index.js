const express = require("express");
const router = express.Router();
const path = require("path");

// Get
router.get("/", (req, res, next) => {
    console.log("index Next1");
    //     next('route');
    //     // res.sendFile(path.join(__dirname, '../index.html'));
    //     //res.send('Hello, Express');
    // }, (req, res, next) => {
    //     console.log("index Next2");
    //     next();
    // }, (req, res, next) => {
    //     console.log("index Next3");
    //     next();
    // }, (req, res) => {
    //     console.log("index Next final");
    res.sendFile(path.join(__dirname, "../index.html"));
});

router
    .route("/abc")
    .get((req, res) => {
        res.send("GET /abc");
    })
    .post((req, res) => {
        res.send("POST /abc");
    });

module.exports = router;
