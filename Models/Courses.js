const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseId:{
        type: Number,
        required: true,
        unique: true,
        default: 0
    },
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    imageLink:{
        type: String,
        required: true,
    },
    
});

module.exports = mongoose.model('Courses', courseSchema);