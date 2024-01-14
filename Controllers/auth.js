const Admins = require("../Models/Admins");
exports.adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;
  const existingUser = Admins.find({ email: email });
  if (!existingUser)
    return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = bcrypt.compare(password, existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({ message: "Invalid credentials" });
    }

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
