// import jwt from "jsonwebtoken"; // Import jwt module instead of Jwt

// import User from "../model/userModel.js";

// // Middleware function to protect routes requiring authentication
// const protectRouter = async (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;
       

//         if (!token) {
//             return res.status(401).json({
//                 error: "Unauthorized - Missing token"
//             });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Use jwt.verify instead of Jwt.verify

//         if (!decoded) {
//             return res.status(401).json({
//                 error: "Unauthorized - Invalid token"
//             });
//         }

//         const user = await User.findById(decoded.userId).select("-password");

//         if (!user) {
//             return res.status(401).json({
//                 error: "User not found"
//             });
//         }

//         req.user = user; // Set the user object in the request
//         next(); // Call the next middleware function
//     } catch (error) {
//         console.error("Error in protect - Router middleware:", error);
//         res.status(500).json({
//             error: "Internal server error"
//         });
//     }
// };

// export default protectRouter;



import jwt from "jsonwebtoken"; // Import jwt module instead of Jwt

import User from "../model/userModel.js";

// Middleware function to protect routes requiring authentication
const protectRouter = async (req, res, next) => {
    try {
        let token = req.cookies.jwt; // Check for token in cookies

        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            // Extract token from Authorization header if not found in cookies
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                error: "Unauthorized - Missing token"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                error: "Unauthorized - Invalid token"
            });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({
                error: "Unauthorized - User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRouter middleware:", error);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};

export default protectRouter;
