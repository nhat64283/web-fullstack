const express = require('express');
const postsModel = require('./post.model');
const joi = require('@hapi/joi');
const postRouter = express.Router();
// postRouter.post('\create',(req,res) => {
//     if(req.session.currentUser && req.session.currentUser._id)
//     {
//         // const newPost = {
//         //     content: req.body.content,
//         //     author: req.session.currentUser._id,
//         //     image: req.body.imageurl,
//         // }
//         postsModel.create({
//             content: req.body.content,
//             author: req.session.currentUser._id,
//             imageUrl: req.body.imageUrl,
//         },(err,data) => {
//             if(err) {
//                 res.status(400).json({
//                     success: false,
//                     message: err.message,
//                 });
//             }
//             else {
//                 res.status(201).json({
//                     success: true,
//                     data: data,
//                 });
//             }
//         });  
//     } else {
//         res.status(400).json({
//             success: false,
//             message: 'no such author exist',
//         });
//     }
// });
postRouter.post('/create-post', async (req,res) => {
    if(!req.session.currentUser || !req.session.currentUser.email)
    {
        res.status(403).json({
            success:false,
            message:'forbidden'
        });

    }
    else {
        const postValidateSchema = joi.object().keys({
            imageUrl: joi.string().required(),
            content: joi.string().required(),
        });
        const validateResult = joi.validate(req.body, postValidateSchema);
        //console.log(validateResult.error);
        if(validateResult.error) {
            const error = validateResult.error.details[0];
            res.status(400).json({
                success: false,
                message: error.message,
            });
        } else {
            //create new post
            try {
                const newPost = await postsModel.create({
                    imageUrl: req.body.imageUrl,
                    content: req.body.content,
                    author: req.session.currentUser._id
                });
                res.status(200).json({
                    success: true,
                    message:"upload successed",
                    data: newPost
                });
            } catch (err) {
                res.status(500).json({
                    success: false,
                    message: err.message,
                });
            }
        }
    }
});
postRouter.get('/:postId', async (req,res) => {
    try {
        const post = await postsModel.findById(req.params.postId)
        .populate('author','_id email fullName avatarUrl')
        .lean();

        res.status(200).json({
            success: true,
            data: post
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
postRouter.get(`/get/posts`,async (req,res) => {
    //pagination
    //infinite scroll
    //offset paging =>  PAGE number || pageSize => linit skip cua db
    const pageNumber = Number(req.query.pageNumber);
    const pageSize = Number(req.query.pageSize);
    const validateSchema = joi.object().keys({
        pageNumber: joi.number().min(1),
        pageSize:joi.number().min(1).max(50),
    })
    //const validateResult = joi.validate(req.query, validateSchema);
    const validateResult = joi.validate({
        pageNumber: pageNumber,
        pageSize: pageSize,
      }, validateSchema);
    if(validateResult.error)
    {
        const error = validateResult.error.details[0];
        res.status(400).json({
            success: false,
            message: error.message,
        });
    } else {
       
        const result = await postsModel.find({})
        .populate('author','_id fullName email')
        .sort({createdAt: -1, fullName: 1})

        .skip((pageNumber-1)*pageSize)
        .limit(pageSize)
        .lean();
        const total = await postsModel.find({}).countDocuments();
        res.status(200).json({
            success:true,
            data:{
                data:result,
                total:total,
            }
        });
    }
});

module.exports = postRouter;