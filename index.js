require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRouter = require('./routers/users.router');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// const getMovies = (req, res) => {
//   pool.query('SELECT * FROM movies', (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(results.rows);
//   });
// };

// const createMovie = (req, res) => {
//   const { movie_title, movie_genre, movie_duration } = req.body;
//   pool.query(
//     'INSERT INTO movies (movie_title, movie_genre, movie_duration) VALUES ($1, $2, $3) RETURNING *',
//     [movie_title, movie_genre, movie_duration],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       res.status(201).json(results.rows[0]);
//     }
//   );
// };

// const routeHandler = (req, res) => {
//   res.status(200).json({});
// };

// app.get('/', routeHandler);
// // app.get('/movies', getMovies);
// // app.post('/movies', createMovie);

// '/' adalah endpoint
