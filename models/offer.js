const mongoose = require('mongoose');
const path = require('path');

const OfferSchema = mongoose.Schema({
    icone: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    discription: { 
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

const offerData = mongoose.model('offer', OfferSchema);
module.exports = offerData;

