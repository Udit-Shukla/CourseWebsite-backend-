const bcrypt = require("bcrypt");
const Admins = require("../Models/Admins");
const Users = require("../Models/Users");
const jwt=require("jsonwebtoken");
//admin registration controller
exports.adminSignin = async (req, res) => {
  try {
    //fetching data from request body
    const { username, password } = req.body;

    //checking if user already exists
    const existingUser = await Admins.findOne({ username: username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user
    const newUser = new Admins({
      username: username,
      password: hashedPassword,
    });

    //creating token
    const token=jwt.sign({username:username,role:"admin"},process.env.JWT_SECRET,{expiresIn:"1h"});

    //saving user and returning response
    const savedUser = await newUser.save();
    res.status(200).json({
      message: "User registered successfully",
      user: savedUser,
      token:token
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong while registering user" });
  }
};

//admin login controller
exports.adminLogin = async (req, res) => {
  try {
    //fetching data from request headers
    const { username, password } = req.headers;

    //checking if admin exists
    const existingUser = await Admins.findOne({ username: username });
    if (!existingUser)
      return res.status(400).json({ message: "User does not exist" });

    //checking if password is correct
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCorrect)
      return res.status(400).json({ message: "Wrong password" });

    //creating token
    const token=jwt.sign({username:username,role:"admin"},process.env.JWT_SECRET,{expiresIn:"1h"});


    //returning response
    res.status(200).json({ message: "Login successfully", user: existingUser,token:token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// user registration controller
exports.userSignin = async (req, res) => {
  try {
    const { username, password } = req.body;

    //validating user inputs
    if (!username || !password)
      return res.status(400).json({
        message: "Please enter all required fields",
      });

    //checking if user already exists
    const existingUser = await Users.findOne({ username: username });
    console.log(existingUser);
    if (existingUser)
      return res.status(400).json({
        message: "User already exists",
      });

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user
    const newUser = new Users({
      username: username,
      password: hashedPassword,
    });

    //creating token
    const token=jwt.sign({username:username,role:"user"},process.env.JWT_SECRET,{expiresIn:"1h"});

    //saving user and returning response
    const savedUser = await newUser.save();
    res.status(200).json({
      message: "User registered successfully",
      user: savedUser,
      token:token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong while registering user",
      error: error.message,
    });
  }
};

//user login controller
exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.headers;
    
    // validating user inputs 
    if (!username || !password)
      return res.status(400).json({
        message: "Please enter all required fields",
      });

    //checking if user exists
    const existingUser =await Users.findOne({ username: username });

    if (!existingUser)
      return res.status(400).json({
        message: "User does not exist. Please sign up first....", 
      });
    
    //checking if password is correct
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    
   if(!passwordCorrect)
    return res.status(400).json({message:"Wrong password"});
    
   //creating token
    const token=jwt.sign({username:username,role:"user"},process.env.JWT_SECRET,{expiresIn:"1h"});
    
    //returning response
    res.status(200).json({ message: "User Login successfully", user: existingUser,
    token:token });
    
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "Something went wrong while logging in user",
        error: error.message,
      });
  }
};
