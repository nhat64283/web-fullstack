const express = require('express');
const postsModel = require('./posts.model');

const postRouter = express.Router();
postRouter.post('\create',(req,res) => {
    if(req.session.currentUser && req.session.currentUser._id)
    {
        // const newPost = {
        //     content: req.body.content,
        //     author: req.session.currentUser._id,
        //     image: req.body.imageurl,
        // }
        postsModel.create({
            content: req.body.content,
            author: req.session.currentUser._id,
            imageUrl: req.body.imageUrl,
        },(err,data) => {
            if(err) {
                res.status(400).json({
                    success: false,
                    message: err.message,
                });
            }
            else {
                res.status(201).json({
                    success: true,
                    data: data,
                });
            }
        });  
    } else {
        res.status(400).json({
            success: false,
            message: 'no such author exist',
        });
    }
});