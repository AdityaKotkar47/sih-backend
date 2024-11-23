const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// MongoDB Connection
// mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB Atlas"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

  mongoose.connect(process.env.DB_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("Error connecting to MongoDB:", err));


// Routes

app.get('/', (req, res) => {
  res.send('Service is running');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

