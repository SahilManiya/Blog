const express = require('express');
const routs = express.Router();
const Admin = require('../models/Admin');
const admincontroller = require('../controllers/admincontroller');
const passport = require('passport');

routs.get('/', (req, res) => {
    if (req.cookies.adminname) {
        return res.redirect('dashboard');
    }
    return res.render('login');
});
routs.get('/dashboard', passport.chekAuth, admincontroller.deshboard);
routs.get('/add_admin', admincontroller.showForm);
routs.get('/view_admin',passport.chekAuth, admincontroller.viewAdmin);
 
routs.get('/isactive/:id', admincontroller.isactive);
routs.get('/deactive/:id', admincontroller.deactive);

routs.get('/updateData/:id', admincontroller.updateAdminData);

routs.get('/deletData/:id',passport.chekAuth, admincontroller.deletAdminData);
routs.post('/insertAdminData', Admin.uploadImage, admincontroller.AdminData)

routs.post('/editAdminData', Admin.uploadImage, admincontroller.editAdminData)
routs.post('/logincheck', passport.authenticate('local', { failureRedirect: '/admin/' }), admincontroller.logincheck);

routs.post('/editpassword', admincontroller.editpassword);

routs.get('/send_otp',(req,res)=>{
    return res.render('forgotpassword/verify_otp');
})

routs.post('/verify_otp',admincontroller.verify_otp);

routs.post('/verifyPass',admincontroller.verifyPass);

routs.get('/logout', async (req, res) => {
    res.clearCookie('admin');
    return res.redirect('/admin/');
})
 
routs.get('/Chengepassword',passport.chekAuth, admincontroller.Chengepassword);

routs.get('/profile',passport.chekAuth, admincontroller.profile);

routs.get('/editprofile',passport.chekAuth, admincontroller.editprofile);
routs.post('/editProfileData',Admin.uploadImage,admincontroller.updateProfile);
routs.post('/edit', Admin.uploadImage, admincontroller.edit);
routs.post("/deleteall",passport.chekAuth,admincontroller.deleteall);

routs.get('/mailpage', function (req, res) {
    res.render('forgotpassword/forgetmail')
});

routs.post('/chekemail', admincontroller.chekemail);

routs.use('/slider',passport.chekAuth,require('../routes/slider'));
routs.use('/offer',passport.chekAuth,require('../routes/offer'));
routs.use('/photo',passport.chekAuth,require('../routes/photo'));
routs.use('/review',passport.chekAuth,require('../routes/review'));
routs.use('/card',passport.chekAuth,require('../routes/card'));
routs.use('/catagory',passport.chekAuth,require('../routes/catagory'));
routs.use('/subcatagory',passport.chekAuth,require('../routes/subcatagory'));

module.exports = routs;





