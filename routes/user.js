const express = require('express');
const routs = express.Router();
const usercontroller = require('../controllers/usercontroller');
const Comment = require('../models/comment');

routs.get('/',usercontroller.userhome);

routs.get('/blog_single/:id',usercontroller.blog_single);

routs.get('/work3',usercontroller.work3);

routs.get('/contact',usercontroller.contact);

routs.post('/addComent',Comment.CommentUploadImage,usercontroller.addComent);

routs.post('/insertContactData',usercontroller.insertContactData);

module.exports = routs;

