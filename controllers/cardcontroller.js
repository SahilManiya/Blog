const Card = require("../models/card");
const path = require('path');
const fs = require('fs');

module.exports.insertCardData = async(req,res)=>{
    let ImagePath = '';
    if(req.file){
        ImagePath = Card.CardModel+"/"+req.file.filename;
    }
    req.body.username = req.user.name;
    req.body.card_image = ImagePath;
    req.body.isActive = true;
    req.body.currentDate = new Date().toLocaleString();
    req.body.updateDate = new Date().toLocaleString();
    let CardData = await Card.create(req.body);
    res.redirect('back'); 
}

module.exports.view_card = async(req,res)=>{
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
        let data = await Card.find({
            $or : [
                {"title" : {$regex:".*"+search+".*",$options:"i"}},
                {"username" : {$regex:".*"+search+".*",$options:"i"}},
                {"catagory" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        })
        .limit(perPage)
        .skip(perPage*page);
        let totalCardData = await Card.find({
            $or : [
                {"title" : {$regex:".*"+search+".*",$options:"i"}},
                {"username" : {$regex:".*"+search+".*",$options:"i"}},
                {"catagory" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        }).countDocuments();
        return res.render("view_card",{ 
            CardData : data,
            searchInput : search,
            totalDocument : Math.ceil(totalCardData/perPage),
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
        let oldData = await Card.findById(req.params.id);
        if(oldData){ 
            let oldImage = oldData.card_image
            if(oldImage){
                let fullPath = path.join(__dirname,"..",oldData.card_image);
                fs.unlinkSync(fullPath);
                let deletData = await Card.findByIdAndDelete(req.params.id);
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
                let deletData = await Card.findByIdAndDelete(req.params.id);
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
            let active = await Card.findByIdAndUpdate(req.params.id,{isActive : false});
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
            let active = await Card.findByIdAndUpdate(req.params.id, { isActive: true });
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

module.exports.deleteall =async (req,res)=>{
    console.log(req.body);
    await Card.deleteMany({_id:{$in:req.body.deleteall}});
    return res.redirect('back');
}