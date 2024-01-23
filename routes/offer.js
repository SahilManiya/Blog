const express = require('express');
const routs = express.Router();
const offerModel = require('../models/offer');
const OfferController = require('../controllers/offercontroller');

routs.get('/add_offer', async(req,res)=>{
    return res.render('add_offer');
})

routs.post('/insertOfferData',OfferController.insertOfferData);

routs.get('/isactive/:id',OfferController.isactive); 

routs.get('/deactive/:id',OfferController.deactive);

routs.get('/view_offer',OfferController.view_offer);

routs.get('/deletData/:id',OfferController.deletData);

routs.post('/deleteall',OfferController.deleteall);

routs.get('/updateData/:id',OfferController.updateData);

routs.post('/editOfferData',OfferController.editOfferData);

module.exports=routs;