const path = require('path');
const Admin = require('../models/Admin');
const fs = require('fs');
const nodemailer = require('nodemailer');

//forgote password start//
module.exports.chekemail = async (req, res) => {
    try {
        console.log(req.body);
        let chekemaildata = await Admin.findOne({ email: req.body.email });
        if (chekemaildata) {
            const transporter = nodemailer.createTransport({
                host: process.env.SMPT_HOST,
                port: process.env.SMPT_PORT,
                secure: true,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: process.env.SMPT_MAIL,
                    pass: process.env.SMPT_PASSWORD,
                },
            });

            var otp = Math.floor(100000+Math.random()*900000);
            res.cookie('otp',otp);
            res.cookie('email',chekemaildata.email);
            const info = await transporter.sendMail({
                from: process.env.SMPT_MAIL, // sender address
                to: chekemaildata.email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello its your otp", // plain text body
                html: `<h3>OTP = ${otp}</h3>`, // html body
              });
              if(info){
                console.log("OTP Send");
                return res.redirect('/admin/send_otp');
              }
        }
        else {
            console.log("email not match");
            return res.redirect('back');
        }
    }
    catch{
        console.log("something wronge");
        return res.redirect('back');
    }
}

module.exports.verify_otp = async(req,res)=>{
    if(req.body.otp == req.cookies.otp){
        return res.render('forgotpassword/new_password');
    }
    else{
        console.log("Otp Not Match");
        return res.redirect('back');
    }
}

module.exports.verifyPass = async(req,res)=>{
    try {
        if(req.body.npass == req.body.cpass){
            let email = req.cookies.email;
            let checkEmail = await Admin.findOne({email:email});
            if(checkEmail){
                let resetPassword = await Admin.findByIdAndUpdate(checkEmail.id,{password:req.body.npass});
                if(resetPassword){
                    res.clearCookie('otp');
                    res.clearCookie('email');
                    return res.redirect('/admin/');
                }
                else{
                    console.log("Password Not Changed");
                    return res.redirect('back');
                }
            }
            else{
                console.log("Email Not Found");
                return res.redirect('back');
            }
        }
        else{
            console.log("Password Not Matched");
            return res.redirect('back');
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}
//forgote password end//

module.exports.profile = async (req, res) => {
    
        return res.render("profile")
   
}

module.exports.edit = async (req, res) => {
    console.log(req.body);
    try {
        if (req.file) {
            if (oldData) {
                if (oldData.adminImage) {
                    let fullPath = path.join(__dirname, '..', oldData.adminImage);
                    await fs.unlinkSync(fullPath);
                }
                var adminImagePath = Admin.imgModel + '/' + req.file.filename;
                req.body.adminImage = adminImagePath;
                req.body.name = req.body.fname + " " + req.body.lname;
                let ad = await Admin.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/logout');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/view_admin');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/view_admin');
            }
        }
        else {
            let oldData = await Admin.findById(req.body.EditId);
            if (oldData) {
                req.body.adminImage = oldData.adminImage;
                req.body.name = req.body.fname + " " + req.body.lname;
                let ad = await Admin.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/logout');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/view_admin');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/view_admin');
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/view_admin');
    }
}
module.exports.editprofile = async (req, res) => { 

    if (req.user == undefined) {
        return res.redirect('/admin/');
    }
    let splitName = req.user.name.split(' ');
    return res.render('update_profile', {
        splitName: splitName,
    });
    // var adminrec = req.cookies.adminName;
    // let splitName = adminrec.name.split(' ');
    // return res.render("editprofile", {
    //     adminData: adminrec,
    //     updateprodata: adminrec,
    //     splitName: splitName
    // });
}

module.exports.updateProfile = async(req,res)=>{
    try {
        if (req.file) {
            let oldData = await Admin.findById(req.body.EditId);
            if (oldData) {
                if (oldData.adminImage) {
                    let fullPath = path.join(__dirname, '..', oldData.adminImage);
                    await fs.unlinkSync(fullPath);
                }
                var adminImagePath = Admin.imgModel + '/' + req.file.filename;
                req.body.adminImage = adminImagePath;
                req.body.name = req.body.fname + " " + req.body.lname;
                let ad = await Admin.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/logout');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/view_admin');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/view_admin');
            }
        }
        else {
            let oldData = await Admin.findById(req.body.EditId);
            if (oldData) {
                req.body.adminImage = oldData.adminImage;
                req.body.name = req.body.fname + " " + req.body.lname;
                let ad = await Admin.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record Update Succesfully");
                    return res.redirect('/admin/logout');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/view_admin');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/view_admin');
            }
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.editpassword = async (req, res) => {
    try {
        // let oldData = req.cookies.adminName;
        let oldData = req.user;
        if (oldData.password == req.body.cupassword) {
            if (req.body.NePassword != req.body.cupassword) {
                if (req.body.NePassword == req.body.CoPassword) {
                    let oldadmin = await Admin.findById(oldData._id);
                    if (oldadmin) {
                        let editpassword = await Admin.findByIdAndUpdate(oldadmin._id, { 'password': req.body.NePassword });
                        if (editpassword) {
                            return res.redirect('/admin/logout');
                        }
                        else {
                            console.log('password not chenge');
                        }
                    }
                }
                else {
                    console.log('Password Does not msatch');
                }
            }
            else {
                console.log('new password and confirm password are not match');
                // return res.redirect('back');
            }
        }
        else {
            console.log('current password are not match');
            // return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        // return res.redirect('back');
    }
}

module.exports.deshboard = async (req, res) => {
    // return res.render('dashboard');
    // if (req.cookies.adminName == undefined) {
    //     return res.redirect('/admin/')
    // }
    // else {
    //     var adminrec = req.cookies.adminName;
    // }
    return res.render("dashboard");
}
module.exports.showForm = async (req, res) => {
    var adminrec = req.cookies.adminName;
    return res.render("add_admin", {
        adminData: adminrec
    });
}

module.exports.viewAdmin = async (req, res) => {
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
        
        var data = await Admin.find({
            $or : [
                {"name" : {$regex:".*"+search+".*",$options:"i"}},
                {"email" : {$regex:".*"+search+".*",$options:"i"}},
            ]
        })
        .limit(perPage)
        .skip(perPage*page);
        let totalAdminData = await Admin.find({
            $or : [
                {"name" : {$regex:".*"+search+".*",$options:"i"}},
                {"email" : {$regex:".*"+search+".*",$options:"i"}},
            ]
        }).countDocuments();

        return res.render("view_admin", {
            mainAdmin: data,
            searchInput : search,
            totalDocument : Math.ceil(totalAdminData/perPage),
            curentPage : page
        });
        
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.AdminData = async (req, res) => { 
    try {
        
        req.body.name = req.body.fname + ' ' + req.body.lname;
        adminImagePath = '';
        if (req.file) {
            adminImagePath = Admin.imgModel + '/' + req.file.filename;
            if (adminImagePath) {
                req.body.adminImage = adminImagePath;
            }
            else {
                console.log("Path Not Found");
            }
        }
        req.body.isActive = true;
        req.body.currentDate = new Date().toLocaleString();
        req.body.updateDate = new Date().toLocaleString();
        await Admin.create(req.body);
        return res.redirect('back');
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.isactive = async (req, res) => {
    try {
        if (req.params.id) {
            let active = await Admin.findByIdAndUpdate(req.params.id, { isActive: false });
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
            let active = await Admin.findByIdAndUpdate(req.params.id, { isActive: true });
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
module.exports.deletAdminData = async (req, res) => {
    try {
        let oldData = await Admin.findById(req.params.id);
        if (oldData) {
            var oldImage = oldData.adminImage;
            if (oldImage) {
                let fullPath = path.join(__dirname, '..', oldData.adminImage);
                await fs.unlinkSync(fullPath);
                let deletData = await Admin.findByIdAndDelete(req.params.id);
                if (deletData) {
                    console.log("Record & Image Delet Succesfully");
                    return res.redirect('back');
                }
                else {
                    console.log("Record Delet Succesfully");
                    return res.redirect('back');
                }
            }
            else {
                let deletData = await Admin.findByIdAndDelete(req.params.id);
                if (deletData) {
                    console.log("Admin Data Delete");
                    return res.redirect('back');
                }
                else {
                    console.log("Admin Record Delete");
                    return res.redirect('back');
                }
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

module.exports.updateAdminData = async (req, res) => {
    try {
        let adminRecord = await Admin.findById(req.params.id);
        let splitName = adminRecord.name.split(' ');
        console.log(splitName);
        if (adminRecord) {
            return res.render('updateAdmin', {
                splitName: splitName,
                AdminData: adminRecord,
                adminData: req.cookies.adminName
            })
        }
        else {
            console.log('Record Not Found');
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.editAdminData = async (req, res) => {
    try {
        if (req.file) {
            let oldData = await Admin.findById(req.body.EditId);
            if (oldData) {
                if (oldData.adminImage) {
                    let fullPath = path.join(__dirname,'..',oldData.adminImage);
                    await fs.unlinkSync(fullPath);
                }
                var adminImagePath = Admin.imgModel + '/' + req.file.filename;
                req.body.adminImage = adminImagePath;
                req.body.name = req.body.fname + " " + req.body.lname;
                let ad = await Admin.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/logout');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/view_admin');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/view_admin');
            }
        }
        else {
            let oldData = await Admin.findById(req.body.EditId);
            if (oldData) {
                req.body.adminImage = oldData.adminImage;
                req.body.name = req.body.fname + " " + req.body.lname;
                let ad = await Admin.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/logout');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/view_admin');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/view_admin');
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/view_admin');
    }
}


module.exports.logincheck = async (req, res) => { 
    return res.redirect('/admin/dashboard')
}

module.exports.Chengepassword = async (req, res) => {
    return res.render('Chengepassword')
}

module.exports.deleteall =async (req,res)=>{
    console.log(req.body);
    await Admin.deleteMany({_id:{$in:req.body.deleteall}});
    return res.redirect('back');
}

