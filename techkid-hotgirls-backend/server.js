const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const expressSession = require('express-session');
const userRouter = require('./Users/users.route');
const postRouter = require('./Post/post.route');
mongoose.connect(`mongodb://localhost:27017/techkid-hotgirls`, { useNewUrlParser: true }, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Connect mongodb success ...!');
        const server = express();
        server.use(bodyParser.json());
        server.use(expressSession({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }
        }));
        // server.use( (req,res,next) => {
        //     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        //     //res.header("Access-Control-Allow-Origin","*");
        //     res.header("Access-Control-Allow-Method","*");
        //     res.header("Access-Control-Allow-Credentials", "true");
        //     res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
        //     next();
        //   } );
          server.use(cors({
              origin : ["http://localhost:3000"],
              credentials:true,
              methods:["GET","PUT","POST"],
              allowedHeaders:["Content-type",'Authorization'],
          }));   
        server.use('/user', userRouter);
        server.use('/post',postRouter);
        server.listen(3001, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Server listen on port 3001 ...`);
            }
        });
    }

});