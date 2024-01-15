const express= require("express");
const router= express.Router();
const {adminSignin, adminLogin}= require("../Controllers/auth");
const {createCourses,editCourses,getCourses} =require("../Controllers/courses");
//Default route
router.get("/", (req, res) => {
    res.send("Hello World");
});

//admin routes
router.post("/admin/signup" , adminSignin);
router.post("/admin/login" , adminLogin);
router.post("/admin/courses", createCourses);
router.put("/admin/courses/:courseId",editCourses);
router.get("/admin/courses",getCourses);

module.exports= router;