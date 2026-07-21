import express from "express";
import { replaceEpi,replaceEpiPart,deleteEpi} from "../controller/controller.js";
const Router=express.Router();


Router.put("/episodes/:id",replaceEpi);
Router.patch("/episode/:id",replaceEpiPart);
Router.delete("/episode/:id",deleteEpi);

export default Router;