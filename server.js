import express from 'express';
import dotenv from 'dotenv';
import {
  serveSwaggerJson,
  jsonErrorsHandler,
  swaggerUi,
  swaggerSpec
} from './middlewares/serverMiddleware';
import DBConnection from './config/db';
import route from './routes/index';

// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
DBConnection();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Swagger UI assets and setup Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', serveSwaggerJson);

// Route middleware
app.use(route);

// Error handling middleware
app.use(jsonErrorsHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
