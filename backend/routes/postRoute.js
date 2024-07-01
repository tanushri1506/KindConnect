import express from "express";
import { create, deletePost, getAll, getOne ,update,getAllByUser} from "../controller/postController.js";

const route = express.Router();

route.post("/create",create);
route.get("/getall",getAll);
route.get("/getone/:id",getOne);
route.put("/update/:id",update);
route.delete("/delete/:id",deletePost);
route.get("/userposts/:author", getAllByUser); // New route

export default route;