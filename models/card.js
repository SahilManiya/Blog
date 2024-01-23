const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const CardPath = "/uploads/card";

const CardSchema = mongoose.Schema({
    title : { 
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    catagory : {
        type : String,
        required : true
    },
    card_image : {
        type : String,
        require : true
    },
    discription : {
        type : String,
        required : true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    currentDate: {
        type: String,
        required: true
    },
    updateDate: {
        type: String,
        required: true
    }
})

CardSchema.statics.CardModel = CardPath;

const CardStore = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",CardPath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now());
    }
})

CardSchema.statics.CardUploadImage = multer({storage : CardStore}).single("card_image");
const CardData = mongoose.model('Card',CardSchema);
module.exports = CardData;

