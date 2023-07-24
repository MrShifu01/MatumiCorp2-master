const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8000;
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const cors = require("cors");

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://matumi-corp2-master.vercel.app/", "*"],
  })
);

app.use("/api/transactions", transactionRoutes);
app.use("/api/upload", uploadRoutes);

console.log({__dirname})
const rootDir = path.resolve(__dirname, '..');
console.log(rootDir)
app.use('/uploads', express.static(rootDir + '/uploads'))

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.listen(PORT, console.log(`Server running on port ${PORT}`));
