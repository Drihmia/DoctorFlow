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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(route);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
