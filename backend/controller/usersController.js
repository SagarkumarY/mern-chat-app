// import User from "../model/userModel.js";


// export const getUsersForSidebar = async (req, res) => {
//     try {
//         const loggedInUserId = req.user._id;
//         const filtersUsers =await User.find({
//             _id:{$ne: loggedInUserId}
//         }).select("-password")
//         res.status(200).json(filtersUsers)
//     } catch (error) {
//         console.log("Error in getUsersFor SIde bar :" + error)
//         res.status(500).json({ error: "internal server error" })
//     }
// }


import User from "../model/userModel.js";

// Controller function to get users for the sidebar, excluding the logged-in user
export const getUsersForSidebar = async (req, res) => {
    try {
        // Get the ID of the logged-in user from the request
        const loggedInUserId = req.user._id;

        // Find all users except the logged-in user
        // const filteredUsers = await (await User.find({ _id: { $ne: loggedInUserId } })).select("-password")
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password").exec();


        // Send the filtered users as a JSON response
        res.status(200).json(filteredUsers);
    } catch (error) {
        // Handle errors
        console.log("Error in getUsersForSidebar: " + error);
        res.status(500).json({ error: "Internal server error" });
    }
};
