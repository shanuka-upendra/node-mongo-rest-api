const express = require('express');
const { connectDB } = require('./db/connection');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config');

const app = express();

// parse JSON request bodies
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// error handling middleware
app.use(errorHandler);

async function start() {
    await connectDB();
    app.listen(config.PORT, () => {
        console.log(`Server is running on http://localhost:${config.PORT}`);
    });
}

start();