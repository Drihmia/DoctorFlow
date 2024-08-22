import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import DBConnection from './config/db.js';
import route from './routes/index.js';

dotenv.config();

const app = express();
const PORT = 3000;

DBConnection();
try {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
} catch (error) {
  console.log(error);
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(route);

// Middleware to handle invalid JSON format, in case the user sends an invalid JSON payload
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: { body: 'Invalid JSON format' } });
  }

  // Pass the error to the next error handler if it's not a SyntaxError
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
