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
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
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
      ContentType: req.file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    const imageUrl = `https://chatspice.s3.us-east-2.amazonaws.com/${fileName}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Upload Error at AWS:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
