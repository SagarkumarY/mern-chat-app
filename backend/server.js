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




import path from 'path';
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
import { app,server } from './socket/socket.js';

// Set port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;


const __dirname = path.resolve()

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON data
app.use(cookieParser()); // Parse cookies

// Authentication routes
app.use('/api/auth', authRouter);

// Message routes
app.use('/api/message', messageRouter);

// Users routes
app.use('/api/users', usersRouter);


// Serve static files from the frontend/dist directory
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// For any other route, serve the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start the server
server.listen(PORT, () => {
    // Connect to the database
    connectDB();
    // Log server listening message
    console.log(`Server is running on http://localhost:${PORT}`);
});
