import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import crypto from "crypto";

export const login = async(req, res) => {
    
    try {
        const {username, password} = req.body;

        if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Invalid username or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
     
    if(isPasswordValid){
        // res.status(200).json({ message: "Login successful!" });
        const token = crypto.randomBytes(32).toString('hex');
        console.log(token);
        user.token = token;
        await user.save();
        return res.status(httpStatus.OK).json({ token: token}); 
    } else{
      return res.status(401).json({ message: "Invalid username or password." });
    }



        
    } catch (error) {
         console.error(error);
    res.status(500).json({ message: "Server error." });
    }
}






export const registerUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    // Validate input
    if (!name || !username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(httpStatus.FOUND).json({ message: "Username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(httpStatus.CREATED).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};


