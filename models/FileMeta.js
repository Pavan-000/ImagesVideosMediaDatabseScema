import mongoose from "mongoose";

const fileMetaSchema = new mongoose.Schema(
    {
        filename : String,
        fileId : mongoose.Schema.types.ObjectId, // GridFS reference
        contentType : String,
        owner : {type : mongoose.Schema.Types.ObjectId, ref : "User"},
        uploadDate : {type : Date, default : Date.now()}
    }
);

const fileMetaData = mongoose.model('fileMetaData', fileMetaSchema);

module.exports = fileMetaData;