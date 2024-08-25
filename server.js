import express from 'express';
import dotenv from 'dotenv';
import {
  serveSwaggerJson,
  setupSwaggerDocs,
  serveSwaggerUiAssets,
  jsonErrorsHandler
} from './middlewares/serverMiddleware';
import DBConnection from './config/db';
import route from './routes/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

DBConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', serveSwaggerUiAssets, setupSwaggerDocs);

app.get('/swagger.json', serveSwaggerJson);

app.use(route);

// Middleware to handle invalid JSON format, in case the user sends an invalid JSON payload
app.use(jsonErrorsHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
