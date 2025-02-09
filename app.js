import express from 'express';
import bodyParser from 'body-parser';
// import newsRoutes from './routes/news.js';
import moviesRoutes from './routes/movies.js';
import usersRoutes from './routes/users.js';
import authRoutes from './routes/router.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(authRoutes);
app.use('/movies', moviesRoutes);
app.use('/users', usersRoutes);


// Error handling middleware
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

// Start server
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});