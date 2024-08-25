import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swagger';

const serveSwaggerJson = (_, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
  next();
};
const setupSwaggerDocs = (_, res, next) => {
  swaggerUi.setup(swaggerSpec);
  next();
};

const serveSwaggerUiAssets = swaggerUi.serve;

const jsonErrorsHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: { body: 'Invalid JSON format' } });
  }

  // Pass the error to the next error handler if it's not a SyntaxError
  next(err);
};
export {
  serveSwaggerJson,
  setupSwaggerDocs,
  serveSwaggerUiAssets,
  jsonErrorsHandler
};
