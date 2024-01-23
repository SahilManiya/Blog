const mongoose = require('mongoose');
const multer = require('multer');
const sliderPath = '/uploads/slider';
const path = require('path');

const sliderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    sliderImage: {
        type: String,
        required: true
    },
    isActive :{
        type : Boolean,
        required : true
    },
    currentDate :{
        type : String,
        required : true
    },
    updateDate :{ 
        type : String,
        required : true
    }
}) 

sliderSchema.statics.sliderImgPath = sliderPath;

const sliderStorage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, path.join(__dirname, "..", sliderPath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
})
sliderSchema.statics.sliderUploadImage = multer({ storage: sliderStorage }).single("sliderImage");

const sliderData = mongoose.model('slidersite', sliderSchema);
module.exports = sliderData;

