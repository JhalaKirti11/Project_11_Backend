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

export const viewChat = async (req, res, next) => {
    const { id } = req.params;
    console.log("id : " + id);
    try {
        const msgss = await Chat.find({ $or: [{ senderId: id }, { receiverId: id }] })
            .populate('senderId', 'name').populate('receiverId', 'name');
        if (msgss) {
            console.log('msg get: ' + msgss);
            return res.status(201).json({ messages: msgss });
        } else {
            console.log("Sorry, Can not fetch the data");
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
