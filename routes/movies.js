import express from 'express';
import fs from 'node:fs/promises';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const movies = await fs.readFile('./data/moviepage.json', 'utf8');
    res.json(JSON.parse(movies));
  } catch (err) {
    next(err);
  }
});

export default router;