import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from 'fs';
import path from 'path';
import { User } from "../modal/User.modal.js";

//-------------------------- Registration ------------------------

export const register = async (req, res, next) => {
    console.log("Creating user start...");

    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(501).json({ error: 'Validation Failed' });
        }

        const { name, email, password } = req.body;
        const imagePath = req.file ? req.file.path : null;

        console.log("User details:", name, email);

        const saltKey = bcrypt.genSaltSync(10);
        const newPass = bcrypt.hashSync(password, saltKey);
        req.body.password = newPass;
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
        if (!user.status) {
            console.log("deactivated user");
            return res.status(401).json({ error: `Deactivated user !` });
        }

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
        // console.log("Fetching all users data...")
        const users = await User.find({ status: true });
        if (users) {
            return res.status(201).json({ msg: `Users : `, users });
        } else {
            return res.status(401).json({ error: `Can not fetch the users right now!` });
        }

    } catch (error) {
        return res.status(500).json({ error: `Internal Server Error!`, error });
    }
}

//------------------------- User Profile ------------------------------

export const userProfile = async (req, res, next) => {
    console.log("entered")
    const { id } = req.params;
    console.log("id : " + id);
    try {
        const user = await User.findById({ _id: id });
        if (user) {
            console.log("got user : " + user);
            return res.status(201).json({ msg: `User : `, user });
        } else {
            console.log("can not fetch the user data")
            return res.status(401).json({ error: `can not fetch the user data` });
        }

    } catch (error) {
        console.log("some error occured : ", error);
        return res.status(500).json({ error: `Internal Server Error!` })
    }
}

//------------------------ Delete ------------------------------------

export const deleteProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { state } = req.body;
        console.log("id : " + id + " state " + state);
        const user = await User.findByIdAndUpdate({ _id: id }, { status: state });
        console.log('status : ', user.status);
        if (user) {
            console.log("user updated");
            return res.status(201).json({ msg: `User : `, user });
        } else {
            console.log("can not fetch the user data")
            return res.status(401).json({ error: `can not fetch the user data` });
        }

    } catch (error) {
        console.log("some error occured : ", error);
        return res.status(500).json({ error: `Internal Server Error!` })
    }
}

//------------------------------------------------------------------------------

export const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { token } = req.body;
    console.log("Token : " + token)
    // const imagePath = req.file ? req.file.path : null;
    if (req.file) {
        const imagePath = req.file.path
        req.body.image = imagePath;
    }

    try {
        const user = await User.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        );

        if (user) {
            res.status(200).json({ success: true, user, token: token });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};