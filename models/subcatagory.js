const mongoose = require('mongoose');
const multer = require('multer'); 
const path = require('path');
const SubcatagoryPath = '/uploads/subcatagory';

const SubcatagorySchema = mongoose.Schema({
    title : { 
        type : String,
        required : true
    },
    catagory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Catagory",
        required : true
    },
    subcatagory_image : { 
        type : String,
        required : true
    },
    description : {
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

SubcatagorySchema.statics.SubcatagoryModel = SubcatagoryPath;

const SubcatagoryStore = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",SubcatagoryPath));
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now());
    }
})

SubcatagorySchema.statics.SubcatagoryUploadImage = multer({storage : SubcatagoryStore}).single("subcatagory_image");
const SubcatagoryData = mongoose.model('Subcatagory',SubcatagorySchema);
module.exports = SubcatagoryData;