require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();

// ----------------------
// CORS configuration
// ----------------------
const allowedOrigins = ['http://localhost:3000', 'https://frontend-dlzk.onrender.com', 'https://test-exam.nopon-market.fr'];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

// ----------------------
// Middleware
// ----------------------
app.use(express.json());

// ----------------------
// Routes
// ----------------------
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// ----------------------
// Global async error handler
// ----------------------
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Si l’erreur vient d’une promesse non catchée
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ msg: message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));