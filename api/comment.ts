import { Router } from "express";
import comment from "@/controller/comment";
const route = Router();

route.get("/:todo_id", comment.get);
route.post("/:todo_id", comment.post);
route.put("/:todo_id", comment.put);
route.delete("/:todo_id", comment.destroy);

export default route;
