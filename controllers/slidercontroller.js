const slidermodel = require('../models/slidersite');
const fs = require('fs');
const path = require('path');

module.exports.insertSliderData = async(req,res)=>{
    let imgPath = '';
    if(req.file){ 
        imgPath = slidermodel.sliderImgPath+"/"+req.file.filename;
    }
    req.body.sliderImage = imgPath;
    req.body.isActive = true;
    req.body.currentDate = new Date().toLocaleString();
    req.body.updateDate = new Date().toLocaleString();
    let sliderData = await slidermodel.create(req.body);
    res.redirect('back');   
}

module.exports.view_slider = async(req,res)=>{
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
        let data = await slidermodel.find({
            $or : [
                {"title" : {$regex:".*"+search+".*",$options:"i"}},
                {"link" : {$regex:".*"+search+".*",$options:"i"}},
                {"description" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        })
        .limit(perPage)
        .skip(perPage*page);
        let totalOfferData = await slidermodel.find({
            $or : [
                {"title" : {$regex:".*"+search+".*",$options:"i"}},
                {"link" : {$regex:".*"+search+".*",$options:"i"}},
                {"description" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        }).countDocuments();
        return res.render("view_slider",{ 
            SliderData : data,
            searchInput : search,
            totalDocument : Math.ceil(totalOfferData/perPage),
            curentPage : page
        })
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.deletData = async(req,res)=>{
    try{
        let oldData = await slidermodel.findById(req.params.id);
        if(oldData){ 
            let oldImage = oldData.sliderImage
            if(oldImage){
                let fullPath = path.join(__dirname,"..",oldData.sliderImage);
                fs.unlinkSync(fullPath);
                let deletData = await slidermodel.findByIdAndDelete(req.params.id);
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
                let deletData = await slidermodel.findByIdAndDelete(req.params.id);
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
            let active = await slidermodel.findByIdAndUpdate(req.params.id,{isActive : false});
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
            let active = await slidermodel.findByIdAndUpdate(req.params.id, { isActive: true });
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
    try{
        let sliderRecord = await slidermodel.findById(req.params.id);
        if(sliderRecord){
            return res.render('update_slider',{
                SliderData : sliderRecord
            })
        }
        else{
            console.log("Record Not Found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.editSliderData = async (req, res) => {
    try {
        if (req.file) {
            let oldData = await slidermodel.findById(req.body.EditSliderId);
            if (oldData) {
                if (oldData.sliderImage) {
                    let fullPath = path.join(__dirname, '..', oldData.sliderImage);
                    try{
                        await fs.unlinkSync(fullPath);
                    }
                    catch(err){
                        console.log("image not in folder");
                    }
                }
                var sliderImagePath = slidermodel.sliderImgPath+'/'+req.file.filename;
                req.body.sliderImage = sliderImagePath;
                let sl = await slidermodel.findByIdAndUpdate(req.body.EditSliderId,req.body);
                if (sl) {
                    console.log("Record And Image Updated Successfully");
                    return res.redirect('/admin/slider/view_slider');
                } 
                else {
                    console.log("Record Not Update111");
                    return res.redirect('/admin/slider/view_slider');
                }
            }
        } else {
            let oldData = await slidermodel.findById(req.body.EditSliderId);
            if (oldData) {
                req.body.sliderImage = oldData.sliderImage;
                let ad = await slidermodel.findByIdAndUpdate(req.body.EditSliderId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/slider/view_slider');
                } else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/slider/view_admin');
                }
            } else {
                console.log("Record Not Updated");
                return res.redirect('/admin/slider/view_admin');
            }
        }
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};


module.exports.deleteall =async (req,res)=>{
    console.log(req.body);
    await slidermodel.deleteMany({_id:{$in:req.body.deleteall}});
    return res.redirect('back');
}