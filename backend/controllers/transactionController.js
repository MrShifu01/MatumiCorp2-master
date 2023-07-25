const asyncHandler = require("../middleware/asyncHandler");
const Transaction = require("../models/TransactionModel");

// @desc    Get all transactions
// @route   GET /transactions
// @access  Public
const getTransactions = asyncHandler(async (req, res) => {
  const { keyword, filterOptionMandate, filterOptionGeography, filterOptionIndustry, page, limit } = req.query;
  console.log(page);

  const startIndex = (parseInt(page) - 1) * limit;
  const endIndex = parseInt(page) * limit;

  // Handle regular transactions query
  let query;
  if (keyword) {
    // if keyword, return transactions that match the keyword
    query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { mandate: { $regex: keyword, $options: "i" } },
        { geography: { $regex: keyword, $options: "i" } },
        { industry: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
  } else if (filterOptionMandate) {
    query = { mandate: { $regex: filterOptionMandate, $options: "i" } };
  } else if (filterOptionGeography) {
    query = { geography: { $regex: filterOptionGeography, $options: "i" } };
  } else if (filterOptionIndustry) {
    query = { industry: { $regex: filterOptionIndustry, $options: "i" } };
  } else {
    // if no keyword or filterOption, return all transactions
    query = {};
  }

  // Fetch total documents to calculate total pages
  const totalDocuments = await Transaction.countDocuments(query);
  const totalPages = Math.ceil(totalDocuments / limit);

  // Fetch paginated transactions based on the query
  const testTransactions = await Transaction.find(query).skip(startIndex).limit(limit);

  res.json({
    transactions: testTransactions,
    currentPage: parseInt(page),
    totalPages,
  });
});



// @desc    Add a transaction
// @route   POST /transactions
// @access  Private/Admin
const addTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.create({
      title: "New Transaction",
      mandate: "New Mandate",
      geography: "New Geography",
      industry: "New Industry",
      description: "New Description",
      imageSrc: "https://via.placeholder.com/100",
    });
    res.status(201).json(transaction);
});

// @desc    Update a transaction
// @route   PUT /transactions/:id
// @access  Private/Admin
const updateTransaction = asyncHandler(async (req, res) => {
    const { 
      title,
      mandate,
      geography,
      industry,
      description,
      imageSrc,
     } = req.body;
    const transaction = await Transaction.findById(req.params.id);
    if (transaction) {
        transaction.title = title;
        transaction.mandate = mandate;
        transaction.geography = geography;
        transaction.industry = industry;
        transaction.description = description;
        transaction.imageSrc = imageSrc;
        const updatedTransaction = await transaction.save();
        res.json(updatedTransaction);
    } else {
        res.status(404);
        throw new Error('Transaction not found');
    }
});

// @desc    Delete a transaction
// @route   DELETE /transactions/:id
// @access  Private/Admin
const deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (transaction) {
        res.json({ message: 'Transaction removed' });
    } else {
        res.status(404);
        throw new Error('Transaction not found');
    }
});

const getSingleTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404);
    throw new Error("Transaction not found");
  }
});

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getSingleTransaction,
};
