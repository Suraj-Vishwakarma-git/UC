import express from "express";
import { verification ,showDetails,episodes} from "../controller/controller.js";
const Router=express.Router();
Router.get("/",verification);
Router.get("/show-details",showDetails);
Router.get("/episodes",episodes);
export default Router;