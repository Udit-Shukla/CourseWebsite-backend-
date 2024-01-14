const express= require("express");
const router= express.Router();

//Default route
router.get("/", (req, res) => {
    res.send("Hello World");
});

// router.post("/admin/login", adminAuthentication , adminlogin);

module.exports= router;