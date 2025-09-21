import express from "express";
import {upload, uploadFile, getFiles, getFile, deleteFile} from '../controllers/fileController';

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getFiles);
router.get("/:id", getFile);
router.delete("/:id", deleteFile);

module.exports = router;