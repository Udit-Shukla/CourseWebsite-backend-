const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    username :{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
    },
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Courses'
    }],
});
module.exports=mongoose.model('Users',userSchema);