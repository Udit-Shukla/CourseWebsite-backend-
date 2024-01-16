const express= require("express");
const router= express.Router();
const {adminSignin, adminLogin,userSignin,userLogin}= require("../Controllers/auth");
const {createCourses,editCourses,getCourses} =require("../Controllers/courses");
const {authenticateJwt} = require("../Middlewares/auth");
//Default route
router.get("/", (req, res) => {
    res.send("Hello World");
});

//admin routes
router.post("/admin/signup", adminSignin);
router.post("/admin/login" , adminLogin);
router.post("/admin/courses",authenticateJwt, createCourses);
router.put("/admin/courses/:courseId",authenticateJwt, editCourses);
router.get("/admin/courses",authenticateJwt, getCourses);


//User routes
router.post("/users/signup" , userSignin);
router.post("/users/login" , userLogin);
router.get("/users/courses",authenticateJwt, getCourses);
// router.post("/users/courses/:courseId",authenticateJwt, purchaseCourse);
// router.get("/users/purchasedCourses", authenticateJwt, getPurchasedCourses);

module.exports= router;