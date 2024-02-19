// import User from '../model/userModel.js'
// import bcrypt from 'bcryptjs';
// import generateTokenAndSetCookie from '../utils/generateToken.js';
// export const signup = async (req, res) => {
//     try {
//         const { fullname, username, password, gender, confirmpassword } = req.body;

//         if (password !== confirmpassword) {
//             return res.status(400).json({
//                 error: "Passwords do not match"
//             })
//         };

//         const user = await User.findOne({ username });
//         if (user) {
//             return res.status(400).json({
//                 error: "Username already exists"
//             });
//         }

//         ///  HASH PASSWORD HERE 
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
//         const gileProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

//         const newUser = new User({
//             fullname,
//             username,
//             password: hashedPassword,
//             gender,
//             profilepic: gender === "male" ? boyProfilePic : gileProfilePic
//         })

//         if (newUser) {
//             generateTokenAndSetCookie(newUser._id,res);
//             await newUser.save();
//             res.status(201).json({
//                 message: "User created successfully", newUser
//             })
//         } else {
//             res.status(500).json({
//                 error: "Something went wrong"
//             })
//         }

//     } catch (error) {
//         console.log("error in signup controller" + error)
//         res.status(500).json({
//             error: error.message
//         })
//     }
// };




import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import  jwt  from 'jsonwebtoken';

// Controller function for user signup
export const signup = async (req, res) => {
    try {
        // Destructure required fields from request body

        const { fullname, username, password, gender, confirmpassword } = req.body;

        // Check if passwords match
        if (password !== confirmpassword) {
            return res.status(400).json({
                error: "Passwords do not match"
            })
        };

        // Check if username already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                error: "Username already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate profile picture URL based on gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const profilepic = gender === "male" ? boyProfilePic : girlProfilePic;

        // Create new user instance
        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilepic
        });
 
         
        // Save new user to database
        await newUser.save();

        // Generate JWT token and set as cookie
        generateTokenAndSetCookie(newUser._id, res);
       // Generate JWT token for response
       const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '50d' });
        // Send success response
        res.status(201).json({
            message: "User created successfully",
            newUser,
            token

        });
    } catch (error) {
        console.error("Error in signup controller:", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};




// Controller function for user login
export const login = async (req, res) => {
    try {
        // Destructure username and password from request body
        let { username, password } = req.body;
        // Check if username exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                error: "Invalid password"
            });
        }

        // Generate JWT token and set as cookie
        generateTokenAndSetCookie(user._id, res);
 // Generate JWT token for response (using the correct user id)
 const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '50d' });

        // Send success response
        res.status(200).json({
            message: "Login successful",
            user,
            token
        });
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};



// Controller function for user logout
export const logout = (req, res) => {
    try {
        // Clear the JWT token cookie
        // res.clearCookie("token");
        // res.cookie("jwt","",{maxAge:0})

        // // Send success response
        // res.status(200).json({
        //     message: "Logout successful"
        // });
        // Clear the JWT token cookie by setting its expiry date in the past
        res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });
        res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        console.error("Error in logout controller:", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};
