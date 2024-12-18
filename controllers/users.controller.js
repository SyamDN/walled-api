const joi = require('joi');
const pool = require('../db/db');
const userService = require('../services/users.service');
const { topUp, transfer } = require('../services/users.service');

const schema = joi.object({
  email: joi.string().email().required(),
  username: joi.string().required(),
  fullname: joi.string().required(),
  password: joi.string().required(),
  balance: joi.number().required(),
});

const loginScheme = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const createUser = async (req, res) => {
  try {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const user = await userService.createUser(value);
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const createUserLogin = async (req, res) => {
  try {
    const { error, value } = loginScheme.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const token = await userService.login(value);
    res.status(200).json({ data: token });
  } catch (error) {
    if (error.message === '404') {
      return res.status(404).json({ message: ' user not exist' });
    }
    if (error.message === '401') {
      return res.status(404).json({ message: ' user not exist' });
    }
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  console.log(req.user, 'haldeko');

  try {
    const { id } = req.user;
    const user = await userService.getUserById(Number(id));
    res.status(200).json({ data: user });
    // res.status(200).json({ data: new UserResponse(user) });
  } catch (error) {
    if (error.message === 'user not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

// const createUser = (req, res) => {
//   const { email, username, fullname, password, balance } = req.body;
//   const schema = joi
//     .object({
//       email: joi.string().email().required(),
//       username: joi.string().required(),
//       fullname: joi.string().required(),
//       password: joi.string().required(),
//       balance: joi.number().required(),
//     })
//     .validate(req.body);
//   if (schema.error) {
//     res.status(400).json({ message: schema.error.details[0].message });
//   } else {
//     pool.query(
//       'INSERT INTO users ( email, username, fullname, password, balance) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//       [email, username, fullname, password, balance],
//       (error, results) => {
//         if (error) {
//           throw error;
//         }
//         res.status(201).json(results.rows[0]);
//       }
//     );
//   }
//   //   console.log(req.body);
// };

module.exports = {
  createUser,
  createUserLogin,
  getUserById,
};
