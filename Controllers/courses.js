const Courses=require('../Models/Courses');

//add course controller
exports.createCourses=async(req,res)=>{
    try {
        const{title,description,price,imageLink}=req.body;
    //verifying the input fields
    if(!title||!description||!price||!imageLink)
        return res.status(400).json({
    success:false,
    message:"Please fill all the fields"});

    // checkig if course already exists
    const existingCourse=await Courses.findOne({title:title});
    if(existingCourse)
        return res.status(400).json({
            success:false,
            message:"Course already exists"
        });

// creating new cource entry
const newCourse=new Courses({
    courseId:Math.floor(Math.random()*1000) ,
    title:title,
    description:description,
    price:price,
    imageLink:imageLink
});
//saving new course entry
const savedCourse=await newCourse.save();

//returning response
res.status(200).json({
    status:true,
    message:"Course created successfully",
    course:savedCourse
})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Something went wrong while creating course",
            error:error.message
        })
    }
}

//edit course controller
exports.editCourses = async (req, res) => {
    try{
        const courseId = req.params.courseId;
        const {title,description,price,imageLink}=req.body;
        console.log(courseId);
        //verifying the input fields
        if(!courseId)
            return res.status(400).json({
                success:false,
                message:"Please provide course id"
            });

        //checking if course exists
        const existingCourse = await Courses.findOne({courseId:courseId});
        if(!existingCourse)
            return res.status(400).json({
                success:false,
                message:"Course does not exists"
            });
            console.log(existingCourse)
        //updating course
        const updatedCourse = await Courses.findOneAndUpdate({courseId:courseId},{
            title:title,
            description:description,
            price:price,
            imageLink:imageLink
        },{new:true});

        //returning response
        res.status(200).json({
            success:true,
            message:"Course updated successfully",
            course:updatedCourse
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:"Something went wrong while editing course",
            error:error.message
        })
    }
}

//get all courses controller
exports.getCourses = async (req, res) => {
    try {
        const courses = await Courses.find();
        res.status(200).json({
            success:true,
            message:"Courses fetched successfully",
            courses:courses
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Something went wrong while getting courses",
            error:error.message
        })
    }
}

//delete course controller