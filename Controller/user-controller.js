import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from 'fs';
import path from 'path';

import { User } from "../modal/User.model.js";

//-------------------------- Registration ------------------------

export const register = async (req, res, next) => {
    console.log("Creating user start...");

    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(501).json({ error: 'Validation Failed' });
        }

        const { name, email, password, image } = req.body;
        console.log("User details:", name, email);

        // Hash password
        const saltKey = bcrypt.genSaltSync(10);
        const newPass = bcrypt.hashSync(password, saltKey);
        req.body.password = newPass;

        let imagePath = '';
        if (image) {
            const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
            const ext = image.split(';')[0].split('/')[1];
            const buffer = Buffer.from(base64Data, 'base64');

            const imagesDir = path.join(process.cwd(), 'public', 'images');
            if (!fs.existsSync(imagesDir)) {
                fs.mkdirSync(imagesDir, { recursive: true });
            }

            const filename = `${Date.now()}.${ext}`;
            const filepath = path.join(imagesDir, filename);
            fs.writeFileSync(filepath, buffer);
            imagePath = `/images/${filename}`;
        }
        

        req.body.image = imagePath;

        const user = await User.create(req.body);

        if (user) {
            console.log("User created.");
            return res.status(201).json({ msg: `${name} created successfully.`, user });
        } else {
            console.log("User could not be created.");
            return res.status(401).json({ error: `Sorry, user cannot be created!` });
        }
    } catch (error) {
        console.log("An error occurred...", error);
        return res.status(500).json({ error: `Internal Server Error!` });
    }
};


//---------------------------- Login -------------------------------------

export const login = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(501).json({ error: 'Invalid Details' })
        }
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            console.log("Passwords : " + password + " " + user.password)
            let status = bcrypt.compareSync(password, user.password);
            if (status) {
                console.log("password matched.");
                console.log("_id : " + user._id)
                return res.status(201).json({ msg: `${user.name} found`, user, token: generateToken(user._id) });
            } else {
                console.log("Incorrect Password!")
                return res.status(401).json({ error: `Incorrect Password !` });
            }
        }
        else
            return res.status(401).json({ error: "Email not register" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
const generateToken = (userId) => {
    let token = jwt.sign({ payload: userId }, "fsdfsdrereioruxvxncnv");
    return token;
};


//-------------------------- Users List ---------------------------
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (users) {
            return res.status(201).json({ msg: `Users : `, users });
        } else {
            return res.status(401).json({ error: `can not fetch the users right now!` });
        }
    } catch (error) {
        return res.status(500).json({ error: `Internal Server Error!`, error });
    }
}

//------------------------- User Profile ------------------------------

export const userProfile = async (req, res, next)=>{
    const {id} = req.params;
    console.log("id : "+ id);
    try{
        const user = await User.findById({_id:id});
        if(user){
            console.log("got user : "+ user);
            return res.status(201).json({ msg: `User : `, user });
        }else{
            console.log("can not fetch the user data")
            return res.status(401).json({ error: `can not fetch the user data` });
        }

    }catch(error){
        console.log("some error occured : ", error);
        return res.status(500).json({error: `Internal Server Error!`})
    }
}