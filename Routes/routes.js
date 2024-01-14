const express= require("express");
const router= express.Router();
const {adminSignin, adminLogin}= require("../Controllers/auth");
//Default route
router.get("/", (req, res) => {
    res.send("Hello World");
});

router.post("/admin/signup" , adminSignin);
router.post("/admin/login" , adminLogin);

module.exports= router;