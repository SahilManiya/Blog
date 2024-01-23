const express = require('express');
const routs = express.Router();
const Catagory = require('../models/catagory');
const CatagoryController = require('../controllers/catagorycontroller');

routs.get('/add_catagory',async(req,res)=>{
    return res.render('add_catagory');
})

routs.post('/insertCatagoryData',CatagoryController.insertCatagoryData);
 
routs.get('/view_catagory',CatagoryController.view_catagory);

routs.get('/deletData/:id',CatagoryController.deletData);
 
routs.get('/isactive/:id',CatagoryController.isactive);

routs.get('/deactive/:id',CatagoryController.deactive);

routs.post('/deleteall',CatagoryController.deleteall);

routs.get('/updateData/:id',CatagoryController.updateData);

routs.post('/editCatagoryData',CatagoryController.editCatagoryData);

module.exports = routs;