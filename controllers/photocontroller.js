const Photo = require('../models/Photo');
const path = require('path');

module.exports.insertPhotoData = async(req,res)=>{
    let ImagePath = ''; 
    if(req.file){
        ImagePath = Photo.Photomodel+"/"+req.file.filename;
    }
    req.body.PhotoImage = ImagePath;
    req.body.isActive = true;
    req.body.currentDate = new Date().toLocaleString();
    req.body.updateDate = new Date().toLocaleString(); 
    let PhotoData = await Photo.create(req.body); 
    res.redirect('back');
}

module.exports.view_photo = async(req,res)=>{
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
        let data = await Photo.find({
            $or : [
                {"title" : {$regex:".*"+search+".*",$options:"i"}},
                {"description" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        })
        .limit(perPage)
        .skip(perPage*page);
        let totalPhotoData = await Photo.find({
            $or : [
                {"title" : {$regex:".*"+search+".*",$options:"i"}},
                {"description" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        }).countDocuments();
        return res.render('view_photo',{
            PhotoData : data,
            searchInput : search,
            totalDocument : Math.ceil(totalPhotoData/perPage),
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
        let oldData = await Photo.findById(req.params.id);
        if(oldData){ 
            let oldImage = oldData.PhotoImage;
            if(oldImage){
                let fullPath = path.join(__dirname,"..",oldData.PhotoImage);
                await fs.unlinkSync(fullPath);
                let deletData = await Photo.findByIdAndDelete(req.params.id);
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
                let deletData = await Photo.findByIdAndDelete(req.params.id);
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
            let active = await Photo.findByIdAndUpdate(req.params.id,{isActive : false});
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
            let active = await Photo.findByIdAndUpdate(req.params.id, { isActive: true });
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
        let photoRecord = await Photo.findById(req.params.id);
        if(photoRecord){
            return res.render('update_photo',{
                PhotoData : photoRecord
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

module.exports.editPhotoData = async (req, res) => {
    try {
        if (req.file) {
            let oldData = await Photo.findById(req.body.EditPhotoId);
            if (oldData) {
                if (oldData.PhotoImage) {
                    let fullPath = path.join(__dirname, '..', oldData.PhotoImage);
                    try{
                        await fs.unlinkSync(fullPath);
                    }
                    catch(err){
                        console.log("image not in folder");
                    }
                }
                var PhotoImagePath = Photo.Photomodel+'/'+req.file.filename;
                req.body.PhotoImage = PhotoImagePath;
                let ph = await Photo.findByIdAndUpdate(req.body.EditPhotoId,req.body);
                if (ph) {
                    console.log("Record And Image Updated Successfully");
                    return res.redirect('/admin/photo/view_photo');
                } 
                else {
                    console.log("Record Not Update");
                    return res.redirect('/admin/photo/view_photo');
                }
            }
        } else {
            let oldData = await Photo.findById(req.body.EditPhotoId);
            if (oldData) {
                req.body.PhotoImage = oldData.PhotoImage;
                let ph = await Photo.findByIdAndUpdate(req.body.EditPhotoId, req.body);
                if (ph) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/photo/view_photo');
                } else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/photo/view_photo');
                }
            } else {
                console.log("Record Not Updated");
                return res.redirect('/admin/photo/view_photo');
            }
        }
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.deleteall =async (req,res)=>{
    console.log(req.body);
    await Photo.deleteMany({_id:{$in:req.body.deleteall}});
    return res.redirect('back');
}