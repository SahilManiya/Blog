const Catagory = require('../models/catagory');
const Subcatagory = require('../models/subcatagory');
const path = require('path');
const fs = require('fs');

module.exports.add_subcatagory = async(req,res)=>{
    try{
        cateData = await Catagory.find({});
        return res.render('add_subcatagory',{
            catedata : cateData
        });
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.insertSubcatagoryData = async(req,res)=>{
    try{
        let ImagePath = '';
        if(req.file){
            ImagePath = Subcatagory.SubcatagoryModel+"/"+req.file.filename;
        }
        req.body.subcatagory_image = ImagePath;
        req.body.isActive = true;
        req.body.currentDate = new Date().toLocaleString();
        req.body.updateDate = new Date().toLocaleString(); 
        let data = await Subcatagory.create(req.body);
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.view_subcatagory = async(req,res)=>{
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
        var perPage = 5;
        let data = await Subcatagory.find({
            $or : [
                {"title" : {$regex:".*"+search+".*",$options:"i"}}     
            ]
        })
        .limit(perPage)
        .skip(perPage*page).populate('catagory').exec();
        let totalSubcatagoryData = await Subcatagory.find({
            $or : [
                {"title" : {$regex:".*"+search+".*",$options:"i"}}
                
            ]
        }).countDocuments();
        return res.render('view_subcatagory',{
            SubcatagoryData : data,
            searchInput : search,
            totalDocument : Math.ceil(totalSubcatagoryData/perPage),
            curentPage : page
        })
    }
    catch(err){
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.deletData = async(req,res)=>{
    try{
        let oldData = await Subcatagory.findById(req.params.id);
        if(oldData){ 
            let oldImage = oldData.subcatagory_image;
            if(oldImage){
                let fullPath = path.join(__dirname,"..",oldData.subcatagory_image);
                await fs.unlinkSync(fullPath);
                let deletData = await Subcatagory.findByIdAndDelete(req.params.id);
                if(deletData){
                    console.log("Record And Image Delete Successfully");
                    return res.redirect('back');
                }
                else{
                    console.log("Record Delete Successfully");
                    return res.redirect('back');
                }
            }
            else{
                let deletData = await Subcatagory.findByIdAndDelete(req.params.id);
                if(deletData){
                    console.log("Record And Image Delete Successfully");
                    return res.redirect('back');
                }
                else{
                    console.log("Record Delete Successfully");
                    return res.redirect('back');
                }
            }
        }
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.isactive = async(req,res)=>{ 
    try{
        if(req.params.id){
            let active = await Subcatagory.findByIdAndUpdate(req.params.id,{isActive : false});
            if(active){
                console.log("Data Deactiveted");
                return res.redirect('back');
            }
            else{
                console.log("Data Activeted");
                return res.redirect('back');
            }
        }
        else{
            console.log("Record Id Not Found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.deactive = async(req,res)=>{
    try{
        if (req.params.id) {
            let active = await Subcatagory.findByIdAndUpdate(req.params.id, { isActive: true });
            if (active) {
                console.log("Data Activated"); 
                return res.redirect('back');
            }
            else {
                console.log("Data Activeted");
                return res.redirect('back');
            }
        }
        else {
            console.log("Record Id Not Found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.updateData = async(req,res)=>{
    try {
        let scate = await Subcatagory.findById(req.params.id);
        let cate = await Catagory.find({});
        console.log(cate)
        if(scate){
            return res.render('update_subcatagory',{
                SubcatagoryData : scate,
                CatagoryData : cate
            })
        }    
        else{
            console.log("Record Are Not Found");
            return res.redirect('back');
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.editSubcatagoryData = async (req, res) => {
    try {
        if (req.file) {
            let oldData = await Subcatagory.findById(req.body.EditSubcatagoryId);
            if (oldData) {
                if (oldData.PhotoImage) {
                    let fullPath = path.join(__dirname, '..', oldData.subcatagory_image);
                    try{
                        fs.unlinkSync(fullPath);
                    }
                    catch(err){
                        console.log("image not in folder");
                    }
                }
                var SubcatagoryImagePath = Subcatagory.SubcatagoryModel+'/'+req.file.filename;
                req.body.subcatagory_image = SubcatagoryImagePath;
                let ph = await Subcatagory.findByIdAndUpdate(req.body.EditSubcatagoryId,req.body);
                if (ph) {
                    console.log("Record And Image Updated Successfully");
                    return res.redirect('/admin/subcatagory/view_subcatagory');
                } 
                else {
                    console.log("Record Not Update");
                    return res.redirect('/admin/subcatagory/view_subcatagory');
                }
            }
        } else {
            let oldData = await Subcatagory.findById(req.body.EditSubcatagoryId);
            if (oldData) {
                req.body.subcatagory_image = oldData.subcatagory_image;
                let ph = await Subcatagory.findByIdAndUpdate(req.body.EditSubcatagoryId, req.body);
                if (ph) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/subcatagory/view_subcatagory');
                } else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/subcatagory/view_subcatagory');
                }
            } else {
                console.log("Record Not Updated");
                return res.redirect('/admin/subcatagory/view_subcatagory');
            }
        }
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.deleteall =async (req,res)=>{
    await Subcatagory.deleteMany({_id:{$in:req.body.deleteall}});
    return res.redirect('back');
}
