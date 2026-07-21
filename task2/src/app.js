import express from "express";
import Router from "./routes/router.js";

const app=express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Server Wroking"
    });
});
app.use("/api",Router);

export default app;