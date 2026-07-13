import express from 'express';
import { registerUser,loginUser,userProfile } from '../controllers/auth.controller.js';

const router=express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.post("/logout",async(req,res)=>{
    try{
        // Implement logout logic (e.g., clear session or token)
        res.status(200).json({message:"Logout successful"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }   
    
});
router.get("/profile",userProfile);

export default router;




