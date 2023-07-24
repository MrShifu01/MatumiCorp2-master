const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8000;
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");
const cors = require("cors");

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://matumi-corp2.vercel.app", "*"],
  })
);

app.use("/api/transactions", transactionRoutes);

app.use(express.static(path.join(__dirname, 'frontend/build')));

// if (process.env.NODE_ENV === "production") {
//   // Set frontend/build as static folder
//   app.use(express.static(path.join(__dirname, "/frontend/build")));
//   // Serve index.html if any route is hit
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running...");
//   });
// }

// if (process.env.NODE_ENV === "production") {
//   // Set frontend/build as static folder
//   app.use(express.static(path.join(__dirname, "frontend", "build")));
//   // Serve index.html if any route is hit
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
//   );
// } else {
//   // Serve API running message
//   app.get("/", (req, res) => {
//     res.send("API is running...");
//   });

//   // Handle other routes or API endpoints in development
//   // ...
// }


app.listen(PORT, console.log(`Server running on port ${PORT}`));
