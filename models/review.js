const mongoose = require('mongoose');
const path = require('path');

const ReviewSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    discription: {  
        type: String,
        required: true
    },
    from : {
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

const ReviewData = mongoose.model('review',ReviewSchema);
module.exports = ReviewData;