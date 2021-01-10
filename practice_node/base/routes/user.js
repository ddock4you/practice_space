const express = require("express");
const router = express.Router();

// GET
router.get("/", (req, res) => {
    res.render("body");
});

router.get("/:id", (req, res) => {
    res.locals.title = "타이틀";
    res.render("user", { user: req.params.id });
    console.log(req.params, req.query);
});

module.exports = router;
