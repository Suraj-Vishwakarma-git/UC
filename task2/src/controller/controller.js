import axios from "axios";

export const verification = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Route is working"
    });
};

export const showDetails = async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.tvmaze.com/singlesearch/shows?q=breaking%20bad"
        );

        const show = response.data;

        return res.status(200).json({
            success: true,
            message: "Show details fetched successfully",
            data: {
                id: show.id,
                name: show.name,
                genres: show.genres,
                language: show.language,
                status: show.status,
                premiered: show.premiered,
                runtime: show.runtime,
                rating: show.rating.average,
                image: show.image.original,
                summary: show.summary
                    ? show.summary.replace(/<[^>]*>/g, "")
                    : ""
            }
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const episodes = async (req, res) => {
    try {
        const showResponse = await axios.get(
            "https://api.tvmaze.com/singlesearch/shows?q=breaking%20bad"
        );

        const showId = showResponse.data.id;
        const episodeResponse = await axios.get(
            `https://api.tvmaze.com/shows/${showId}/episodes`
        );
        const data = episodeResponse.data.map((episode) => ({
            season: episode.season,
            number: episode.number,
            name: episode.name,
            airdate: episode.airdate,
            runtime: episode.runtime,
            rating: episode.rating.average,
            image: episode.image?.original || null,
            summary: episode.summary
                ? episode.summary.replace(/<[^>]*>/g, "")
                : ""
        }));
        return res.status(200).json({
            success: true,
            message: "Episodes fetched successfully",
            totalEpisodes: data.length,
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};