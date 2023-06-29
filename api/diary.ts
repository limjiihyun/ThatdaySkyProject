import { Router } from "express";
import diary from "@/controller/diary";

const route = Router();
route.get("/:year/:month/:date", diary.get);
route.post("/:year/:month/:date", diary.post);
route.get("/:year/:month", diary.gets);

export default route;
