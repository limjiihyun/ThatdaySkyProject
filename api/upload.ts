import { Router } from "express";
import multer from "multer";
import upload from "@/controller/upload";

// multer.memoryStorage : 메모리에 임시 파일로 저장
const memoryStorage = multer({ storage: multer.memoryStorage() });

const route = Router();

route.post("/:year/:month/:date", memoryStorage.single("upload"), upload.image);

export default route;
