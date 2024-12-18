const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactions.controller');
const cors = require('cors');

// Route untuk membuat transaksi
app.use(cors);
router.post('/transaction', transactionController.createTransactionController);
router.get('/findtransaction', transactionController.findTransactionById);

module.exports = router;
