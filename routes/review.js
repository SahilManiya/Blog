const express = require('express');
const routs = express.Router();
const Review = require('../models/review');
const ReviewController = require('../controllers/reviewcontroller');

routs.get("/add_review",async(req,res)=>{ 
    return res.render('add_review');
})

routs.post("/insertReviewData",ReviewController.insertReviewData);
 
routs.get('/isactive/:id',ReviewController.isactive); 

routs.get('/deactive/:id',ReviewController.deactive);

routs.get('/view_review',ReviewController.view_review);

routs.get('/deletData/:id',ReviewController.deletData);

routs.get('/updateData/:id',ReviewController.updateData);

routs.post("/editReviewData",ReviewController.editReviewData);

routs.post('/deleteall',ReviewController.deleteall);


module.exports = routs;