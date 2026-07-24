import movie from "../model/movie.js";

export const verification = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Route is working"
    });
};


export const createEpi = async (req, res) => {
    try {
        const { season, name, number, rating, airdate, summary } = req.body;

        if (
            !season ||
            !name ||
            !number ||
            rating == null ||
            !airdate ||
            !summary
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const episode = await movie.create({
            season,
            name,
            number,
            rating,
            airdate,
            summary
        });

        res.status(201).json({
            success: true,
            message: "Episode created successfully",
            data: episode
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const allEpi = async (req, res) => {
    try {

        const episodes = await movie.find();

        res.status(200).json({
            success: true,
            count: episodes.length,
            data: episodes
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const getOneEpi = async (req, res) => {
    try {

        const { id } = req.params;
        const episode = await movie.findById(id);
        if (!episode) {
            return res.status(404).json({
                success: false,
                message: "Episode not found"
            });
        }

        res.status(200).json({
            success: true,
            data: episode
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};