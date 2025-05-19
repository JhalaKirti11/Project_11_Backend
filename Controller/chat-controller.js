import { User } from '../modal/User_schema.js';
import { Chat } from '../modal/User_schema.js';

export const sendMessage = async (req, res, next) => {
    const { message, receiverId } = req.body;
    const { id } = req.params;
    try {
        console.log("sender's id : " + id + " recever's id : " + receiverId);
        console.log(" msg : " + message);
        const send = await Chat.create({
            senderId: id,
            receiverId: receiverId,
            message: message
        });
        console.log("status...");
        if (send) {
            console.log('msg send successfully : ' + send);
            const user = await User.findById({ receiverId });
            user.notification.push(send);
            return res.status(201).json({ msg: `${message} send successfully`});
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

// export const sendMessage = async (req, res, next) => {
//     const { message, receiverId } = req.body;
//     const { id } = req.params;
//     try {
//         console.log("sender's id : " + id + " recever's id : " + receiverId);
//         console.log(" msg : " + message);
//         const senderUser = await User.findById({ _id: id });
//         const sender = await senderUser.notification.push({}, {
//             senderId: id,
//             receiverId: receiverId,
//             message: message,
//             status: 'send'
//         });

//         const receiverUser = await User.findById({ _id: receiverId });
//         const receiver = await receiverUser.notification.push({
//             senderId: id,
//             receiverId: receiverId,
//             message: message,
//             status: 'received'
//         });
//         console.log("status...");
//         if (sender && receiver) {
//             console.log('msg send successfully : ' + senderUser);
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

// export const viewMsg = async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         // let statusM = 'send';
//         let allMsg = await User.find({ _id: id })
//             .populate('notification')
//         // .populate({ path: "notification.senderId", select: "name" })
//         // .populate({ path: "notification.receiverId", select: "name" });
//         if (allMsg) {
//             console.log("msgs : " + allMsg);

//             // if (id === allMsg.senderId) {
//             //     statusM = 'send';
//             // } else {
//             //     statusM = 'received';
//             // }
//             // allMsg = { ...allMsg, statusM }

//             // console.log("new all messages : " + allMsg);
//             return res.status(201).json({ messages: allMsg });
//         } else {
//             console.log("Sorry, Can not fetch the data");
//             return res.status(401).json({ error: 'sending failed dude!' })
//         }
//     } catch (error) {
//         console.log("error : " + error);
//         return res.status(501).json({ error: 'Internal Server Error', error })
//     }
// }
