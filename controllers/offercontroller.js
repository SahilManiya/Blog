const Offer = require('../models/offer');
const path = require('path');
const fs = require('fs');

module.exports.insertOfferData = async(req,res)=>{
    req.body.isActive = true;
    req.body.currentDate = new Date().toLocaleString();
    req.body.updateDate = new Date().toLocaleString();
    let offerData = await Offer.create(req.body);
    res.redirect('back'); 
}

module.exports.view_offer = async(req,res)=>{
    try{
        let search = '';
        if(req.query.search){
            search = req.query.search;
        }
        if(req.query.page){
            page = req.query.page;
        }
        else{
            page = 0;
        }
        var perPage = 2;
        let data = await Offer.find({
            $or : [
                {"title" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        })
        .limit(perPage)
        .skip(perPage*page);

        let totalOfferData = await Offer.find({
            $or : [
                {"title" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        }).countDocuments();
        
        return res.render('view_offer',{
            OfferData : data,
            searchInput : search,
            totalDocument : Math.ceil(totalOfferData/perPage),
            curentPage : page
        }); 
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.isactive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await Offer.findByIdAndUpdate(req.params.id, { isActive: false });
            if (active) {
                console.log("Data Deactive Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Record Not Deactive");
                return res.redirect('back');
            }
        }
        else {
            console.log("Params Id not Found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.deactive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await Offer.findByIdAndUpdate(req.params.id, { isActive: true });
            if (active) {
                console.log("Data Activated Successfully");
                return res.redirect('back');
            }
            else {
                console.log("Record Not Deactive");
                return res.redirect('back');
            }
        }
        else {
            console.log("Params Id not Found");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.deletData = async (req, res) => { 
    try {
        let oldData = await Offer.findById(req.params.id);
        if (oldData) {
            let deletData = await Offer.findByIdAndDelete(req.params.id);
            if (deletData) {
                console.log("Record Delete Succesfully");
                return res.redirect('back');
            }
            else {
                console.log("Record Not Delete");
                return res.redirect('back');
            }
        }
        else {
            console.log("Record Not Found");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports.updateData = async(req,res)=>{ 
    try{
        let record = await Offer.findById(req.params.id);
        if(record){
            return res.render('update_offer',{
                OfferData : record
            })
        }
        else{
            console.log("Record Not Found");
            return res.redirect('back')
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.editOfferData = async (req, res) => {
    try {
        let oldData = await Offer.findById(req.body.EditOfferId);
        console.log(oldData);
        if (oldData) {
            let data = await Offer.findByIdAndUpdate(req.body.EditOfferId,req.body);
            if (data) {
                console.log("Record Update Succesfully");
                return res.redirect('/admin/offer/view_offer');
            } 
            else {
                console.log("Record Not Updated");
                return res.redirect('back');
            }
        }
        else {
            console.log("Record Not Updated");
            return res.redirect('back');
        }
        
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};

module.exports.deleteall =async (req,res)=>{
    console.log(req.body);
    await Offer.deleteMany({_id:{$in:req.body.deleteall}});
    return res.redirect('back');
}

