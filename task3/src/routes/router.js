import express from "express";
import { verification ,createEpi,allEpi,getOneEpi} from "../controller/controller.js";
const Router=express.Router();

Router.get("/",verification);
Router.post("/episodes",createEpi);
Router.get("/episodes",allEpi);
Router.get("/episodes/:id",getOneEpi);
export default Router;