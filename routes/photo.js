const express = require('express');
const routs = express.Router();
const Photo = require("../models/Photo");
const PhotoContoller = require('../controllers/photocontroller');

routs.get("/add_photo",async(req,res)=>{
    return res.render('add_photo'); 
}) 

routs.get("/view_photo",PhotoContoller.view_photo);

routs.post("/insertPhotoData",Photo.PhotoUploadImage,PhotoContoller.insertPhotoData); 

routs.get('/deletData/:id',PhotoContoller.deletData);
 
routs.get('/isactive/:id',PhotoContoller.isactive);

routs.get('/deactive/:id',PhotoContoller.deactive);

routs.get('/updateData/:id',PhotoContoller.updateData);

routs.post('/editPhotoData',Photo.PhotoUploadImage,PhotoContoller.editPhotoData);

routs.post('/deleteall',PhotoContoller.deleteall);

module.exports = routs;