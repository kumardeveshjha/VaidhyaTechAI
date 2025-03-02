const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001; 

// Middleware
app.use(cors()); 
app.use(express.json()); 
console.log(process.env.MONGODB_URI);
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Routes 

import authRouter from './Routes/route.cjs';
app.use('/auth', authRouter); 


const path = require('path'); 
const auth = require('./middleware/auth.js');

app.get('/dashboard', auth, (req, res) => { 
    res.sendFile(path.join(__dirname, 'public', '../dashboard.html')); 
});


app.get('/', (req, res) => {
    res.send('Welcome to Vaidhyatech AI Backend!');
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
