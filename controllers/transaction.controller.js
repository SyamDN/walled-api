const { createTransaction, findTransactionById } = require('../repositories/transactions.repository');

// Create a transaction
const createTransactionController = async (req, res) => {
  const { dateTime, type, fromTo, description, amount } = req.body;

  try {
    const transaction = await createTransaction({ dateTime, type, fromTo, description, amount });
    res.status(201).json({
      message: 'Transaction created successfully',
      data: transaction,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

// Find a transaction by ID
const findTransactionByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await findTransactionById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ data: transaction });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTransactionController,
  findTransactionByIdController,
};
