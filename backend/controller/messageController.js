// import Conversation from '../model/conversationModel.js'
// import Message from '../model/messageModel.js';

// export const sendMessage = async (req, res) => {
//     try {
//         const { message } = req.body;
//         const { id: receiverId } = req.params;
//         const senderId = req.user._id;

//         let conversation = await Conversation.findOne({
//             participants: { $all: [receiverId, senderId] }
//         });

//         if (!conversation) {
//             conversation = await Conversation.create({
//                 participants: [senderId, receiverId]
//             })
//         };
//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             message
//         })
//         if (newMessage) {
//             conversation.messages.push(newMessage._id);
//         }


//         res.status(201).json(newMessage);
//     } catch (err) {
//         console.log("Error in Send Message controller: " + err)
//         res.status(500).json({err:"Internal server error"});
//     }
// };



import Conversation from '../model/conversationModel.js';
import Message from '../model/messageModel.js';
import { getReceiverSocketId ,io} from '../socket/socket.js';


// Send a Message to a conversation using Post request method
export const sendMessage = async (req, res) => {
    try {
        // Extract necessary data from request
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Find or create conversation between sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [receiverId, senderId] }
        });

        if (!conversation) {
            // Create new conversation if none exists
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // Create new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        // Save the new message
        // await newMessage.save();



        // Push the ID of the new message to the conversation's messages array
        conversation.messages.push(newMessage._id);

        // Save the updated conversation
        // await conversation.save();

        await Promise.all([conversation.save(), newMessage.save()])

        // Socket.io functionality goes here 

        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        // Respond with the new message
        res.status(201).json(newMessage);
    } catch (err) {
        // Handle errors
        console.error("Error in Send Message controller:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get messages controller using GET method
export const getMessages = async (req, res) => {
    try {
        // Extract userToChatId from request parameters and senderId from user object
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        // Find conversation between userToChatId and senderId and populate messages
        const conversation = await Conversation.findOne({
            participants: { $all: [userToChatId, senderId] }
        }).populate("messages");

        // If no conversation is found, return an empty array
        if (!conversation) {
            return res.status(200).json([]);
        }

        // Extract messages from the conversation
        const messages = conversation.messages;

        // Respond with the messages
        res.status(200).json(messages);
    } catch (error) {
        // Handle errors
        console.error("Error in Get Message controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};