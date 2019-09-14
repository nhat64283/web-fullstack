const express = require("express");
const UserModel = require("./users.model");
const bcryptjs = require("bcryptjs");
const userRouter = express.Router();
var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

userRouter.post('/register', async (req, res) => {
   try {
    if (!emailRegex.test(req.body.email)) {
        res.status(400).json({
            success: false,
            message: 'Invalid email address',
        });
    }
    else if (req.body.password.length < 6) {
        res.status(400).json({
            success: false,
            message: ' pw too short',
        });
    } else {
        const hashPassword = bcryptjs.hashSync(req.body.password,10);

        const data = await UserModel.findOne({ email: req.body.email }).lean();
        console.log(data);
        if (data) {
            res.status(400).json({
                success: false,
                message: 'email has been used',
            });
        } else {

            let newUser = await UserModel.create({
                email: req.body.email,
                password: hashPassword,
                fullName: req.body.fullname
            });
            res.status(201).json({
                success: true,
                data: newUser,
            });
        }
    }
   } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    });

   }
});

userRouter.post('/login',async (req,res) => {
    try {
        if (!emailRegex.test(req.body.email)) {
            res.status(400).json({
                success: false,
                message: 'Invalid email address',
            });
        }
        else if (req.body.password.length < 6) {
            res.status(400).json({
                success: false,
                message: ' pw too short',
            });
        } else {
            const data = await UserModel.findOne({ email: req.body.email }).lean();
            if (bcryptjs.compareSync(req.body.password, data.password)){
                req.session.currentUser = {
                    email:data.email,
                    _id: data._id,
                    
                };
                res.status(201).json({
                    success:true,
                    message:"login success",
                    data:{
                        email:data.email,
                    }
                });

            } else {
                res.status(400).json({
                    success: false,
                    message: ' pw is wrong',
                });
            }
        }
    } catch (error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
});
userRouter.get('/logout',(req,res) => {
    req.session.destroy();
    res.status(200).json({
        success:true,
        message:'logout success',
    });
});
userRouter.get('/test',(req,res) => {
    console.log(req.session.currentUser);
    res.json({
        success:true,
        data:req.session.currentUser,
    });
});
module.exports = userRouter;