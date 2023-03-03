import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

//CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
mongoose.set("strictQuery", true);

//FILE STORAGE
const adminStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets/admins");
    },
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now() + "-" + uuidv4();
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
});

const teacherStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets/teachers");
    },
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now() + "-" + uuidv4();
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
});

const studentStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets/students");
    },
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now() + "-" + uuidv4();
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
});
