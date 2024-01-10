import express from "express";
import { findUser, loginController, registerController , getUsers } from "../controller/authController/user.js";


const router = express.Router()


router.post("/register" , registerController )
router.post("/login" , loginController )
router.get("/findUser/:userId" , findUser )
router.get("/getUsers" , getUsers )

export default router