const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const {authenticateToken}=require("./userAuth");

// Signup
router.post("/sign-up", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);  
    const { username, email, password, address } = req.body;

    // Validate username length
    if (username.length < 4) {
      return res.status(400).json({ message: "Username length should be greater than 3" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Validate password length
    if (password.length < 7) {
      return res.status(400).json({ message: "Password length should be greater than 6" });
    }

    // Hash password
    const hashPass = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username: username,
      email: email,
      password: hashPass,
      address: address,
    });

    await newUser.save();
    return res.status(200).json({ message: "Signup successfully" });

  } catch (error) {
    console.error("Signup error:", error); // helpful for debugging
    res.status(500).json({ message: "Internal server error" });
  }
});

//signin
router.post("/sign-in", async (req, res) => {
    try {
        const {username,password}=req.body;
        const existingUser=await User.findOne({username});
        if(!existingUser)
        {
            res.status(400).json({ message: "Invalid Credentials" });


        }

        await bcrypt.compare(password,existingUser.password,(err,data)=>{

            if(data){

                const authClaims=[
                  
                   {name:existingUser.username},
                   {role:existingUser.role},

                ]
                const token=jwt.sign({authClaims},"Bookstore123",{expiresIn:"30d",
                });
                res
                .status(200)
                .json({
                    
                    id:existingUser._id,
                    role:existingUser.role,
                    token:token, 
                });

            }
            else{
                res.status(400).json({ message: "Invalid Credentials" });
            }
        })
     
    } catch (error) {
      console.error("Signup error:", error); // helpful for debugging
      res.status(500).json({ message: "Internal server error" });
    }
 });
  
 //get user info
 router.get("/get-user-info", authenticateToken, async (req, res) => {
    try {
      console.log("Decoded JWT payload:", req.user);
      const {id} = req.headers;
      const data = await User.findById(id).select("-password");
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });


  
   
 // Update username, email, password
router.put("/update-user", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { username, email, password } = req.body;

    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateFields.password = hashed;
    }

    await User.findByIdAndUpdate(id, updateFields);
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
