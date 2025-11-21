const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const dbConnect = require('./config/db');
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const itemRoutes = require('./Routes/itemRoutes');
 

const app = express();
const PORT = process.env.PORT || 7000;
 
  const corsOptions = {
    origin: process.env.CLIENT_URL?.split(',') || ['http://localhost:5173'],
    credentials: true,
  };

// Connect to the database
  dbConnect();

// Middleware
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan('dev'));



// Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/items', itemRoutes);
 
// Test route
app.get("/api",(req,res)=>{
res.send("Welcome to the Auth Athen API");
})
 

  // Start the server
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);

  });
