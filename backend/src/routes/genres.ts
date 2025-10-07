import express from "express";
import Genre, { IGenre } from "../models/genre";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find().sort("name");
    res.json(genres);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const genre = new Genre({ name });
    await genre.save();
    res.status(201).json(genre);
  } catch (err) {
    res.status(400).send("Invalid data");
  }
});

export default router;
