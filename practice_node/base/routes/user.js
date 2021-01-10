const express = require("express");
const router = express.Router();

// GET
router.get("/", (req, res) => {
    res.send("Hello, User");
});

router.get("/:id", (req, res) => {
    res.send(`hello ${req.params.id} 유저`);
    console.log(req.params, req.query);
});

module.exports = router;
