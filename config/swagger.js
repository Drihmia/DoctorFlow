import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'DoctorFlow API',
    version: '1.0.0',
    description: 'API documentation for the DoctorFlow project',
  },
  servers: [
    {
      url: 'https://drihmia.tech',
      description: 'Development server',
    },
  ],
  externalDocs: { // <<< this will add the link to your swagger page
    description: 'swagger.json', // <<< link title
    url: '/swagger.json', // <<< and the file added below in app.get(...)
  },
  components: {
    securitySchemes: {
      basicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
  },
  tags: [
    {
      name: 'Doctors',
      description: 'Endpoints for managing doctor-related data. Includes functionality for retrieving, creating, updating, and deleting doctor records, handling authentication with "connect" for token generation and "disconnect" for token deletion.',
    },
    {
      name: 'Patients',
      description: 'Endpoints for managing patient-related data. Includes functionality for retrieving, creating, updating, and deleting patient records, handling  authentication with "connect" for token generation and "disconnect" for token deletion.',
    },
    {
      name: 'Sessions',
      description: 'Endpoints for managing session-related data. Includes functionality for retrieving, creating, updating, and deleting session records',
    },
    {
      name: 'Devs',
      description: 'Endpoints for handling developer authentication with "connect" for token generation and "disconnect" for token deletion.',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
