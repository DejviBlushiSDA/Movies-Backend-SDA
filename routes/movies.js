import express from 'express';
import fs from 'node:fs/promises';

const filePath = './data/moviepage.json'; 


const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const movies = await fs.readFile(filePath, 'utf8');
    res.json(JSON.parse(movies));
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { title, image, description } = req.body;

    if (!title || !image || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Read existing movies
    const moviesData = await fs.readFile(filePath, "utf8");
    const movies = JSON.parse(moviesData);

    // Create new movie entry
    const newMovie = {
      id: movies.length + 1, // Simple auto-increment ID (you can refine this logic)
      title,
      image,
      description,
    };

    // Add the new movie to the start of the array
    movies.push(newMovie); // Add at the beginning

    // Write back updated data
    await fs.writeFile(filePath, JSON.stringify(movies, null, 2));

    res.status(201).json({ message: "Movie added successfully!", movie: newMovie });
  } catch (err) {
    next(err);
  }
});

export default router;