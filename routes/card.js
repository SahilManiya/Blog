const express = require('express');
const routs = express.Router();
const Card = require('../models/card');
const CardController = require("../controllers/cardcontroller");

routs.get("/add_card",function(req,res){
    return res.render("add_card");
})

routs.post("/insertCardData",Card.CardUploadImage,CardController.insertCardData);

routs.get('/view_card',CardController.view_card);

routs.get('/deletData/:id',CardController.deletData);
 
routs.get('/isactive/:id',CardController.isactive);

routs.get('/deactive/:id',CardController.deactive);

routs.post('/deleteall',CardController.deleteall);

module.exports = routs; 