const Catagory = require('../models/catagory');
const path = require('path');

module.exports.insertCatagoryData = async(req,res)=>{
    console.log(req.body);
    if(req.body){
        req.body.isActive = true;
        req.body.currentDate = new Date().toLocaleString();
        req.body.updateDate = new Date().toLocaleString();
        await Catagory.create(req.body);
        return res.redirect('back');
    }
}

module.exports.view_catagory = async(req,res)=>{
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
        let data = await Catagory.find({
            $or : [
                {"catagory" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        })
        .limit(perPage)
        .skip(perPage*page);

        let totalCatagoryData = await Catagory.find({
            $or : [
                {"catagory" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        }).countDocuments();
        
        return res.render('view_catagory',{
            CatagoryData : data,
            searchInput : search,
            totalDocument : Math.ceil(totalCatagoryData/perPage),
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
            let active = await Catagory.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await Catagory.findByIdAndUpdate(req.params.id, { isActive: true });
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
        let oldData = await Catagory.findById(req.params.id);
        if (oldData) {
            let deletData = await Catagory.findByIdAndDelete(req.params.id);
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
        let data = await Catagory.findById(req.params.id);
        if(data){
            return res.render('update_catagory',{
                CatagoryData : data
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

module.exports.editCatagoryData = async(req,res)=>{
    let oldData = await Catagory.findById(req.body.EditCatagoryId);
    if(oldData){
        let data = await Catagory.findByIdAndUpdate(req.body.EditCatagoryId,req.body);
        if(data){
            console.log("Category Updated Successfully");
            return res.redirect("/admin/catagory/view_catagory");
        }
        else{
            console.log("Category Data Not Update");
            return res.redirect('back');
        } 
    }
    else{
        console.log("Category Data Not Update")
        return res.redirect('back');
    }
}

module.exports.deleteall =async (req,res)=>{
    console.log(req.body);
    await Catagory.deleteMany({_id:{$in:req.body.deleteall}});
    return res.redirect('back');
}