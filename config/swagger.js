import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'DoctorFlow API',
    version: '1.0.0',
    description: 'API documentation for the DoctorFlow project'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ],
  externalDocs: {                // <<< this will add the link to your swagger page
    description: "swagger.json", // <<< link title
    url: "/swagger.json"         // <<< and the file added below in app.get(...)
  }
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

