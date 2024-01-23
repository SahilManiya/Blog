const slider = require('../models/slidersite');
const Offer = require('../models/offer');
const Photo = require('../models/Photo');
const Review = require('../models/review');
const Card = require('../models/card');
const Category = require('../models/catagory');
const Subcategory = require('../models/subcatagory');
const Comment = require('../models/comment');
const Contact = require('../models/contact');
const nodemailer = require('nodemailer')

module.exports.userhome = async(req,res)=>{
    let sliderData = await slider.find({});
    let OfferData = await Offer.find({});
    let PhotoData = await Photo.find({});
    let ReviewData = await Review.find({});
    let CardData = await Card.find({});
    return res.render('userpanal/userhome',{
        sliderData : sliderData,
        OfferData : OfferData,
        PhotoData : PhotoData,
        ReviewData : ReviewData,
        CardData : CardData
    })
}

module.exports.blog_single =async(req,res)=>{
    try {
        if(req.params.id){
            var allPostId = await Card.find();
            var idArray = [];
            allPostId.map((v)=>{
                idArray.push(v.id);
            })
            var next = '';
            for(let i=0;i<idArray.length;i++){ 
                if(idArray[i]===req.params.id){
                    next = i;
                    break;
                }
            }
        }
        let data = await Card.findById(req.params.id);
        let CommentData = await Comment.find({postId:req.params.id});
        let recentPost = await Card.find({}).sort({"_id":-1}).limit(3);
        console.log(req.params.id)
        return res.render('userpanal/blog_single',{
            data : data,
            postId : req.params.id,
            Comment : CommentData,
            allId : idArray,
            pos : next,
            recentPost : recentPost
        });
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.work3 = async(req,res)=>{
    const CatData = await Category.find({});
    const SubcatData = await Subcategory.find({});
    return res.render('userpanal/work3',{
        CatData : CatData,
        SubcatData : SubcatData
    });
}

module.exports.addComent = async(req,res)=>{
    try{
        let ImagePath = ''; 
        if(req.file){
            ImagePath = Comment.CommentModel+"/"+req.file.filename;
        }
        req.body.userImage = ImagePath;
        req.body.isActive = true;
        req.body.currentDate = new Date().toLocaleString();
        req.body.updateDate = new Date().toLocaleString(); 
        let CommentData = await Comment.create(req.body); 
        res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.contact = async(req,res)=>{
    try {
        return res.render('userpanal/contact');    
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.insertContactData = async(req,res)=>{
    try {
        req.body.isActive = true;
        req.body.currentDate = new Date().toLocaleString();
        req.body.updateDate = new Date().toLocaleString();
        let data = await Contact.create(req.body);
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: "sahilmaniya76@gmail.com",
              pass: "ajmkqqnndvxjwmos",
            },
        });
        const info = await transporter.sendMail({
            from: 'sahilmaniya76@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "YOM", // Subject line
            text: "<h2>req.body.name</h2>", // plain text body
            html: `<h3>Thank You For Visiting</h3><b> ${req.body.name}</b>`, // html body
        });
        return res.redirect('back');
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}