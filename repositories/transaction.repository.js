const pool = require('../db/db');

// Create a new transaction
const createTransaction = async (transaction) => {
  const { dateTime, type, fromTo, description, amount } = transaction;

  try {
    const result = await pool.query(
      `INSERT INTO transactions (dateTime, type, fromTo, description, amount)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [dateTime, type, fromTo, description, amount]
    );
    return result.rows[0]; // Return the newly created transaction
  } catch (error) {
    console.error('Error in createTransaction:', error.message);
    throw new Error('Database error occurred while creating the transaction.');
  }
};

// Find a transaction by ID
const findTransactionById = async (id) => {
  try {
    const result = await pool.query(
      'SELECT * FROM transactions WHERE id = $1',
      [id]
    );
    return result.rows[0]; // Return the transaction if found
  } catch (error) {
    console.error('Error in findTransactionById:', error.message);
    throw new Error(
      'Database error occurred while retrieving the transaction.'
    );
  }
};

module.exports = {
  createTransaction,
  findTransactionById,
};
