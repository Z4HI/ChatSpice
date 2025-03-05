import express from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Configure S3 client for Wasabi
const s3 = new S3Client({
  endpoint: "https://s3.us-east-1.wasabisys.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY,
    secretAccessKey: process.env.WASABI_SECRET_KEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Route
router.post("/image", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const fileName = `uploads/${Date.now()}-${req.file.originalname}`;

    const params = {
      Bucket: "chatspice",
      Key: fileName,
      Body: req.file.buffer, // Directly use buffer, no local file
      ACL: "public-read",
      ContentType: req.file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    const imageUrl = `https://s3.us-east-1.wasabisys.com/chatspice/${fileName}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Upload Error at wasabi:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
