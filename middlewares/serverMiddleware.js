import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../config/swagger';

const serveSwaggerJson = (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
  console.log('serving swagger json');
};

const jsonErrorsHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: { body: 'Invalid JSON format' } });
  }
  console.log(err);
  // Pass the error to the next error handler if it's not a SyntaxError
  next(err);
};
export {
  serveSwaggerJson,
  jsonErrorsHandler,
  swaggerUi,
  swaggerSpec,
};
