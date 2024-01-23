const express = require('express');
const routs = express.Router();
const Subcatagory = require('../models/subcatagory');
const SubcatagoryController = require('../controllers/subcatagorycontroller');

routs.get('/add_subcatagory',SubcatagoryController.add_subcatagory);

routs.post('/insertSubcatagoryData',Subcatagory.SubcatagoryUploadImage,SubcatagoryController.insertSubcatagoryData);

routs.get("/view_subcatagory",SubcatagoryController.view_subcatagory);

routs.get('/deletData/:id',SubcatagoryController.deletData);
 
routs.get('/isactive/:id',SubcatagoryController.isactive);

routs.get('/deactive/:id',SubcatagoryController.deactive);

routs.post('/deleteall',SubcatagoryController.deleteall);

routs.get('/updateData/:id',Subcatagory.SubcatagoryUploadImage,SubcatagoryController.updateData);

routs.post('/editSubcatagoryData',SubcatagoryController.editSubcatagoryData);

module.exports = routs; 