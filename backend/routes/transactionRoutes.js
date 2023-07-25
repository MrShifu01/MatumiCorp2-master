const express = require('express')
const router = express.Router()
const { getTransactions, addTransaction, deleteTransaction, getSingleTransaction, updateTransaction } = require('../controllers/transactionController')

router.route('/')
.get(getTransactions)
.post(addTransaction)

router.route('/admin/:id')
.delete(deleteTransaction)
.get(getSingleTransaction)
.put(updateTransaction)

router.route('/test')
.get(getTransactions)

module.exports = router