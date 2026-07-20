import axios from "axios";
import movie from "../model/movie.js";
import connectDB from "../config/db.js";

const seed = async () => {
    try {
        await connectDB();
        await movie.deleteMany({});
        const show = await axios.get(
            "https://api.tvmaze.com/singlesearch/shows?q=breaking%20bad"
        );
        const episodes = await axios.get(
            `https://api.tvmaze.com/shows/${show.data.id}/episodes`
        );
        const data = episodes.data.map((episode) => ({
            season: episode.season,
            name: episode.name,
            number: episode.number,
            rating: episode.rating.average,
            airdate: episode.airdate,
            summary: episode.summary
                ? episode.summary.replace(/<[^>]*>/g, "")
                : "",
        }));
        await movie.insertMany(data);
        console.log(`${data.length} episodes seeded successfully.`);
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exit(1);
    }
};

seed();