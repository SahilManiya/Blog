const Review = require('../models/review');
const path = require('path');

module.exports.insertReviewData = async(req,res)=>{
    req.body.isActive = true;
    req.body.currentDate = new Date().toLocaleString();
    req.body.updateDate = new Date().toLocaleString();
    let reviewData = await Review.create(req.body);
    return res.redirect('back');
} 

module.exports.view_review = async(req,res)=>{
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
        let data = await Review.find({
            $or : [
                {"name" : {$regex:".*"+search+".*",$options:"i"}},
                {"from" : {$regex:".*"+search+".*",$options:"i"}},
                {"description" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        })
        .limit(perPage)
        .skip(perPage*page);

        let totalReviewData = await Review.find({
            $or : [
                {"name" : {$regex:".*"+search+".*",$options:"i"}},
                {"from" : {$regex:".*"+search+".*",$options:"i"}},
                {"description" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        }).countDocuments();
        
        return res.render('view_review',{
            ReviewData : data,
            searchInput : search,
            totalDocument : Math.ceil(totalReviewData/perPage),
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
            let active = await Review.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await Review.findByIdAndUpdate(req.params.id, { isActive: true });
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
        let oldData = await Review.findById(req.params.id);
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
    try {
        let record = await Review.findById(req.params.id);
        if(record){
            return res.render('update_review',{
                ReviewData : record
            })
        }
        else{
            console.log("Record Not Found");
            return res.redirect('back');
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.editReviewData = async(req,res)=>{
    try {
        let oldData = await Review.findById(req.body.EditReviewId);
        if(oldData){
            let data = await Review.findByIdAndUpdate(req.body.EditReviewId,req.body);
            if(data){
                console.log("Review Data Updated Successfully");
                return res.redirect('/admin/review/view_review');
            }
            else{
                console.log("Review Data Not Update"); 
                return res.redirect('back');
            }
        }
        console.log("Review Data Not Update");
        return res.redirect('back');
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.deleteall =async (req,res)=>{
    console.log(req.body);
    await Review.deleteMany({_id:{$in:req.body.deleteall}});
    return res.redirect('back');
}