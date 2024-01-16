const Courses = require('../Models/Courses');
const Users = require('../Models/Users');

//purchase course controller
//icomplete cannot find a way to find which user purchases the course

exports.purchaseCourse= async(req,res)=>{
    try {
        const {courseId}=req.params.courseId;
        //verifying the input fields
        if(!courseId)
            return res.status(400).json({
                success:false,
                message:"Please provide course id to purchase..."
            });

        //checking if course exists
        const existingCourse = await Courses.findOne({courseId:courseId});
        
        //getting username 
        const username = req.user.username;
        const existingUser= await Users.findOne({username:username});

        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"User does not exists"
            });
        }
        if(!existingCourse)
            return res.status(400).json({
                success:false,
                message:"Course does not exists"
            });

        //adding course to purchased courses
        const updatedUser = await Users.findOneAndUpdate({username:username},{
            $push:{purchasedCourses:existingCourse._id}
        },{new:true});
        
        //returning response
        res.status(200).json({
            success:true,
            message:"Course purchased successfully",
            user:updatedUser
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Something went wrong while purchasing course",
            error:error.message
        })
    }
}


//get purchased courses controller