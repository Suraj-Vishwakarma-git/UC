import mongoose from "mongoose";
import movie from "../model/movie.js";

export const replaceEpi = async (req, res) => {
    try {
        const { id } = req.params;
        const { season, name, number, rating, airdate, summary } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid MongoDB ObjectId"
            });
        }
        if (
            season == null ||
            !name ||
            number == null ||
            rating == null ||
            !airdate ||
            !summary
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const data = {
            season,
            name,
            number,
            rating,
            airdate,
            summary,
            updatedAt: new Date()
        };

        const updated = await movie.findByIdAndUpdate(
            id,
            data,
            {
                new: true,          
                runValidators: true 
            }
        );
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Episode not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Episode updated successfully",
            data: updated
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const replaceEpiPart = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid MongoDB ObjectId"
            });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one field to update."
            });
        }
        const data = {...req.body };
        delete data.id;
        delete data._id;
        data.updatedAt = new Date();
        const updated = await movie.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Episode not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Episode updated successfully",
            data: updated
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const deleteEpi=async (req,res)=>{
       try{
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid MongoDB ObjectId"
            });
        }
        const deleteEpi=await movie.deleteOne({_id:id});
        if (deleteEpi.deletedCount === 0) {
          return res.status(404).json({
          success: false,
          message: "Episode not found"
           });
        }
        res.status(200).json({
          success:true,
          message:"Deleted Successfully",
          deleteEpi
        });
    }catch(e){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });   
    }
}