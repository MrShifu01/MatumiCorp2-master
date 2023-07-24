const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const modalsData = require('./data/modalsData.js');
const Transaction = require('./models/TransactionModel.js');
const connectDB = require('./config/db.js');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Transaction.deleteMany();
    await Transaction.insertMany(modalsData);
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Transaction.deleteMany();
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}