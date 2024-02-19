// import express from 'express';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// /// Routes import
// import messageRouter from './routes/messageRouter.js';
// import authRouter from './routes/authRouter.js';
// import usersRouter from './routes/usersRouter.js'
// import connectDB from './db/db.js';
// // Load environment variables from .env file
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;
// app.use(express.json());
// app.use(cookieParser());
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
// /// Authentication routes
// app.use('/api/auth', authRouter)
// // Message router 
// app.use('/api/message', messageRouter)
// // users routes
// app.use('/api/users', usersRouter)
// app.listen(PORT, () => {
//     connectDB();
//     console.log(`Example app listening on port http://localhost:${PORT}`);
// });




import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';


// Import routes
import messageRouter from './routes/messageRouter.js';
import authRouter from './routes/authRouter.js';
import usersRouter from './routes/usersRouter.js';


// Import database connection
import connectDB from './db/db.js';

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Set port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON data
app.use(cookieParser()); // Parse cookies

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Authentication routes
app.use('/api/auth', authRouter);

// Message routes
app.use('/api/message', messageRouter);

// Users routes
app.use('/api/users', usersRouter);

// Start the server
app.listen(PORT, () => {
    // Connect to the database
    connectDB();
    // Log server listening message
    console.log(`Server is running on http://localhost:${PORT}`);
});
