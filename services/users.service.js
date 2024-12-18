const userRepository = require('../repositories/users.repository');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../utils/auth.util');
const {
  topUpBalance,
  transferBalance,
} = require('../repositories/users.repository');

const createUser = async (userData) => {
  let user = await userRepository.findUserByEmail(userData.email);
  if (user.length > 0) {
    throw new Error('user already exist');
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const newUser = { ...userData, password: hashedPassword };
  user = await userRepository.createUser(newUser);
  return user;
};

const login = async (userData) => {
  let user = await userRepository.findUserByEmail(userData.email);
  if (user.rows.length === 0) {
    throw new Error(404);
  }

  const isPasswordMatch = await bcrypt.compare(
    userData.password,
    user.rows[0].password
  );

  if (!isPasswordMatch) {
    throw new Error(401);
  }

  const token = generateAccessToken({
    email: userData.email,
    id: user.rows[0].id,
  });

  return token;
};

const getUserById = async (id) => {
  console.log('USER ID', id);

  let user = await userRepository.findUserById(id);
  console.log(user);

  if (!user) {
    throw new Error('user not found');
  }
  return user;
};

  
module.exports = { createUser, login, getUserById };
