import mongoose from "mongoose";
import multer from 'multer';
import { GridFSBucket } from "mongodb";
import FileMeta from "../models/FileMeta";

let gfsBucket;

mongoose.connection.on("connected", () => {
    gfsBucket = new GridFSBucket(mongoose.connection.db, {bucketName : "uploads"});
});

// Multer setup (store in memory, then pipe to GridFS)
const storage = multer.memoryStorage();
export const upload = multer({storage});

const uploadFile = async (req, res) => {
    try {
        const {originalName, mimetype, buffer} = req.file;
        const uploadStream = gfsBucket.openUploadStream(originalName, {contentType : mimetype });
        uploadStream.end(buffer);

        uploadStream.on("finish", async (file) => {
            const meta = await FileMeta.create({
                filename : file.filename,
                fileId : file._id,
                contentType : mimetype,
                owner : req.user
            });
            res.status(201).json({message : "file uploaded", meta});
        })
    } catch (error) {
        res.status(500).json({message : "upload failed"});
    }
};

const getFiles = async (req, res) => {
    try {
        const files = await FileMeta.find({owner : req.user});
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({message : "error getting files"});
    }
};

const getFile = async (req, res) => {
    try {
        const file = await FileMeta.findOne({_id : req.params.id, owner : req.user});

        if(!file) return res.status(404).json({message : "file not found"});
        res.set("Content-Type", file.contentType);
        gfsBucket.openUploadStream(file.fileId).pipe(res);
    } catch (error) {
        res.status(500).json({message : "error getting file"})
    }
};

const deleteFile = async (req, res) => {
    try {
        const file = await FileMeta.findOne({_id : req.params.id, owner : req.user});
        if(!file)   return res.status(404).json({message : "File Not Found"});

        await gfsBucket.delete(file.fileId);
        await FileMeta,deleteOne({_id : file._id});

        res.json({message : "fileDeleted"});
    } catch (error) {
        res.status(500).json({message : "Error deleting file"});
    }
}

module.exports = {
    uploadFile,
    getFiles,
    getFile,
    deleteFile
}