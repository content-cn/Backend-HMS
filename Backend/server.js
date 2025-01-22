// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const authRoutes = require('./Routes/authroutes');
const formRoute = require('./Routes/registrationformRoute')


const app = express();
app.use(express.json());
app.use(cors());


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB:', err);
});

app.get('/',(req, res)=>{
    res.send("hello Ninja")
})

app.use('/api/auth',authRoutes)
app.use('/api/form',formRoute)

// Define the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


