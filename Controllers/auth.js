const bcrypt = require("bcrypt");
const Admins = require("../Models/Admins");
//admin registration controller
exports.adminSignin = async (req, res) => {
    try {
        //fetching data from request body
        const { username, password } = req.body;

        //checking if user already exists
        const existingUser =await Admins.findOne({ username: username });
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

        //saving user and returning response
        const savedUser = await newUser.save();
        res.status(200).json({ 
            message: "User registered successfully",
            user: savedUser, });



    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong while registering user"});

    }
};




//admin login controller
exports.adminLogin = async (req, res) => {
  try {
    //fetching data from request headers
    const { username, password } = req.headers;

    //checking if user exists
    const existingUser= await Admins.findOne({username: username});
    if(!existingUser)
        return res.status(400).json({message: "User does not exist"});

    //checking if password is correct
    const passwordCorrect= await bcrypt.compare(password, existingUser.password);
    if(!passwordCorrect)
        return res.status(400).json({message: "Wrong password"});

    //returning response
    res.status(200).json({message: "Login successfully",
    user: existingUser,
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
