const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); // Import CORS middleware

const paymentRoutes = require('./routes/payment');

dotenv.config();
connectDB();

const app = express();
// Middleware

app.use(cors({
  origin: '*', // Allow all origins (not recommended for production)
  methods: ['GET', 'POST', 'PUT'] // Allow specific HTTP methods
}));

app.use(express.json()); // Body parser
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


// Routes
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);



const PORT = 7000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
