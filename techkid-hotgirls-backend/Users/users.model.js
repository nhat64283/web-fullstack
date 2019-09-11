const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    avatarUrl:{
        type:String,
    },
    description:{
        type:String,
    },

    createdAt:{
        type:String,
        default:new Date(),
    },
    lastmodifiedAt:{
        type:String,
    }
  });
  const UserModel = mongoose.model('User', UserSchema);
  
  module.exports = UserModel;