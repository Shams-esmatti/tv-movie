import express from "express";
import Movie from "../models/movie";
import Genre from "../models/genre";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().populate("genre", "name"); // ✅ fixed
    res.json(movies);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, genreId, numberInStock, dailyRentalRate } = req.body;

    const genre = await Genre.findById(genreId);
    if (!genre) return res.status(400).send("Invalid genre ID");

    const movie = new Movie({
      title,
      genre: genre._id,
      numberInStock,
      dailyRentalRate,
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).send("Invalid data");
  }
});

export default router;
