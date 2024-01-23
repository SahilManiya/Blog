const mongoose = require('mongoose');
const path = require('path');

const CatagorySchema = mongoose.Schema({ 
    catagory : {
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

const Catagory = mongoose.model('Catagory',CatagorySchema);
module.exports = Catagory;