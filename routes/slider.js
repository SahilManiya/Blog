const express = require('express');
const routs = express.Router();
const slidermodel=require('../models/slidersite');
const slidercontroller = require('../controllers/slidercontroller');

routs.get('/add_slider', async(req,res)=>{
    return res.render('slider');
})
 
routs.get('/view_slider',slidercontroller.view_slider);

routs.get('/deletData/:id',slidercontroller.deletData);
 
routs.get('/isactive/:id',slidercontroller.isactive);

routs.get('/deactive/:id',slidercontroller.deactive);

routs.post('/insertSliderData', slidermodel.sliderUploadImage,slidercontroller.insertSliderData);

routs.get('/updateData/:id',slidercontroller.updateData);

routs.post('/editSliderData',slidermodel.sliderUploadImage,slidercontroller.editSliderData);

routs.post('/deleteall',slidercontroller.deleteall);

module.exports=routs; 