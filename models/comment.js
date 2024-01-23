const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const CommentPath = '/uploads/comment';

const CommentSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true 
    },
    userImage : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required: true
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Card",
        required : true
    },
    isActive : {
        type : Boolean,
        required : true
    },
    currentDate: {
        type: String,
        required: true
    },
    updateDate: {
        type: String, 
        required: true
    }
})

CommentSchema.statics.CommentModel = CommentPath;

const CommentStore = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",CommentPath));
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now());
    }
})
CommentSchema.statics.CommentUploadImage = multer({storage : CommentStore}).single("userImage");
const CommentData = mongoose.model('Comment',CommentSchema);
module.exports = CommentData;