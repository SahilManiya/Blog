const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const PhotoPath = '/uploads/photo';

const PhotoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    PhotoImage : {
        type: String,
        required: true
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
 
PhotoSchema.statics.Photomodel = PhotoPath;

const PhotoStore = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",PhotoPath));
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now());
    }
})
PhotoSchema.statics.PhotoUploadImage = multer({storage : PhotoStore}).single("PhotoImage");
const PhotoData = mongoose.model('Photo',PhotoSchema);
module.exports = PhotoData;