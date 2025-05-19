import { User } from '../modal/User_schema.js';
import { Chat } from '../modal/User_schema.js';

export const sendMessage = async (req, res, next) => {
    const { message, receiverId } = req.body;
    const { id } = req.params;
    try {
        console.log("sender's id : " + id + " receiver's id : " + receiverId);
        console.log(" msg : " + message);
        const send = await Chat.create({
            senderId: id,
            receiverId: receiverId,
            message: message
        });
        console.log("status...");
        if (send) {
            console.log('msg send successfully : ' + send);
            const user = await User.findById(receiverId);
            user.notification.push(send);
            return res.status(201).json({ msg: `${message} send successfully` });
        } else {
            console.log("sending failed!");
            return res.status(401).json({ error: 'sending failed dude!' })
        }
    } catch (error) {
        console.log("error : " + error);
        return res.status(501).json({ error: 'Internal Server Error', error })
    }
}

// export const sendMessage = async (req, res, next) => {
//     const { message, receiverId } = req.body;
//     const { id } = req.params;
//     try {
//         console.log("sender's id : " + id + " recever's id : " + receiverId);
//         console.log(" msg : " + message);
//         const send = await Chat.create({
//             senderId: id,
//             receiverId: receiverId,
//             message: message
//         });
//         console.log("status...");
//         if (send) {
//             const user = await User.findById(receiverId);
//             if (user) {
//                 user.notification.push(send);
//                 console.log("Notification in user schema...")
//             }
//             console.log('msg send successfully : ' + send);
//             return res.status(201).json({ msg: `${message} send successfully` });
//         } else {
//             console.log("sending failed!");
//             return res.status(401).json({ error: 'sending failed dude!' })
//         }
//     } catch (error) {
//         console.log("error : " + error);
//         return res.status(501).json({ error: 'Internal Server Error', error })
//     }
// }

//===================================================================

export const viewChat = async (req, res) => {
    try {
        const { id } = req.params;

        const messages = await Chat.find({
            $or: [{ senderId: id }, { receiverId: id }]
        }).sort({ createdAt: 1 });

        res.status(200).json({ messages });

    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Server error" });
    }
};