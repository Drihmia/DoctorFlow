
window.onload = function () {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
    "swaggerDoc": {
      "openapi": "3.0.0",
      "info": {
        "title": "DoctorFlow API",
        "version": "1.0.0",
        "description": "API documentation for the DoctorFlow project"
      },
      "servers": [
        {
          "url": "http://localhost:3000",
          "description": "Development server"
        }
      ],
      "components": {
        "securitySchemes": {
          "basicAuth": {
            "type": "http",
            "scheme": "basic"
          }
        }
      },
      "tags": [
        {
          "name": "Doctors",
          "description": "Endpoints for managing doctor-related data. Includes functionality for retrieving, creating, updating, and deleting doctor records, handling authentication with \"connect\" for token generation and \"disconnect\" for token deletion."
        },
        {
          "name": "Patients",
          "description": "Endpoints for managing patient-related data. Includes functionality for retrieving, creating, updating, and deleting patient records, handling  authentication with \"connect\" for token generation and \"disconnect\" for token deletion."
        },
        {
          "name": "Sessions",
          "description": "Endpoints for managing session-related data. Includes functionality for retrieving, creating, updating, and deleting session records"
        },
        {
          "name": "Devs",
          "description": "Endpoints for handling developer authentication with \"connect\" for token generation and \"disconnect\" for token deletion."
        }
      ],
      "paths": {
        "/doctors": {
          "get": {
            "summary": "Retrieve a list of all doctors - for dev.",
            "description": "**Note:** This endpoint is intended for development and testing purposes only. It should not be used in production environments with real patient data.\nRetrieves a list of all doctors with optional pagination. This endpoint is restricted to users with the 'dev' role and requires authentication using a valid token in the `x-token` header.\n\n**Authentication:**\n- Bearer Token via `x-token` header.\n- Requires a role of `dev`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token.\n- `page` (header, optional): The page number for pagination.\n- `limit` (header, optional): The number of records per page.\n\n**Response:**\n- A list of doctor objects, each containing details such as `_id`, `firstName`, `lastName`, `email`, `gender`, `specialization`, and more.\n",
            "tags": [
              "Doctors"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "eca7336d-7d3e-4123-9105-4b99f174d4c5"
                }
              },
              {
                "name": "page",
                "in": "query",
                "description": "The page number to retrieve (for pagination).",
                "required": false,
                "schema": {
                  "type": "integer",
                  "example": 1
                }
              },
              {
                "name": "limit",
                "in": "query",
                "description": "The number of records to retrieve per page (for pagination).",
                "required": false,
                "schema": {
                  "type": "integer",
                  "example": 10
                }
              }
            ],
            "responses": {
              "200": {
                "description": "A list of doctors retrieved successfully.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string",
                            "example": "66c5c864a73c8c2f1cbad794"
                          },
                          "firstName": {
                            "type": "string",
                            "example": "John"
                          },
                          "lastName": {
                            "type": "string",
                            "example": "Doe"
                          },
                          "email": {
                            "type": "string",
                            "example": "johndoe@example.com"
                          },
                          "password": {
                            "type": "string",
                            "example": "$2b$10$tD12oUKX6xnnIXfVzbFtOu00EN/VTdtWY5wIGOBkqfAYZ3wUkrGYy"
                          },
                          "gender": {
                            "type": "string",
                            "example": "M"
                          },
                          "specialization": {
                            "type": "string",
                            "example": "Cardiology"
                          },
                          "patients": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "example": []
                          },
                          "sessions": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "example": []
                          },
                          "bio": {
                            "type": "string",
                            "example": "Experienced cardiologist with over 10 years of practice."
                          },
                          "phone": {
                            "type": "string",
                            "example": "1234567890"
                          },
                          "dob": {
                            "type": "string",
                            "example": "1980-05-20"
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-21T10:58:44.532+00:00"
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-21T11:36:03.155+00:00"
                          },
                          "__v": {
                            "type": "integer",
                            "example": 0
                          }
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden - Access restricted to 'dev' role",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only users with 'dev' role can access this route."
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal server error"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "post": {
            "summary": "Create a new doctor account - for doctor.",
            "description": "Creates a new doctor account with the provided details.\n\n**Authentication:**\n- No authentication required.\n\n**Request Body:**\n- Required fields: `firstName`, `lastName`, `email`, `password` (must be at least 8 characters long, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol), `confirmPassword` (must match `password`), `gender`, `dob`.\n- Optional fields: `specialization`, `bio`, `phone`, `address`, `city`, `state`.\n\n**Response:**\n- On success: Returns the unique identifier and details of the newly created doctor.\n- On error: Provides details about validation issues or server errors.\n",
            "tags": [
              "Doctors"
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "firstName": {
                        "type": "string",
                        "example": "John",
                        "description": "The first name of the doctor."
                      },
                      "lastName": {
                        "type": "string",
                        "example": "Doe",
                        "description": "The last name of the doctor. It will be stored in uppercase."
                      },
                      "email": {
                        "type": "string",
                        "format": "email",
                        "example": "johndoe@example.com",
                        "description": "A unique email address for the doctor. Must be a valid email format."
                      },
                      "password": {
                        "type": "string",
                        "format": "password",
                        "example": "P@ssw0rd!",
                        "description": "Password for the doctor's account. Must be at least 8 characters long."
                      },
                      "confirmPassword": {
                        "type": "string",
                        "format": "password",
                        "example": "P@ssw0rd!",
                        "description": "Confirmation of the password. Must match the password."
                      },
                      "gender": {
                        "type": "string",
                        "enum": [
                          "M",
                          "F"
                        ],
                        "example": "M",
                        "description": "The gender of the doctor. Must be either 'M' or 'F'."
                      },
                      "specialization": {
                        "type": "string",
                        "example": "Cardiology",
                        "description": "The doctor's area of specialization. Defaults to 'Generalist' if not provided."
                      },
                      "bio": {
                        "type": "string",
                        "example": "Experienced cardiologist with over 10 years of practice.",
                        "description": "A short biography of the doctor."
                      },
                      "dob": {
                        "type": "string",
                        "format": "date",
                        "example": "1980-05-20",
                        "description": "Date of birth of the doctor."
                      },
                      "phone": {
                        "type": "string",
                        "example": "1234567890",
                        "description": "The doctor's phone number."
                      },
                      "address": {
                        "type": "string",
                        "example": "123 Main St",
                        "description": "Street address of the doctor's office."
                      },
                      "city": {
                        "type": "string",
                        "example": "Springfield",
                        "description": "City where the doctor is located."
                      },
                      "state": {
                        "type": "string",
                        "example": "IL",
                        "description": "State where the doctor is located."
                      }
                    },
                    "required": [
                      "firstName",
                      "lastName",
                      "email",
                      "password",
                      "confirmPassword",
                      "gender",
                      "dob"
                    ]
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Doctor account created successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "The unique identifier of the newly created doctor.",
                          "example": "66c5c864a73c8c2f1cbad794"
                        },
                        "firstName": {
                          "type": "string",
                          "example": "John"
                        },
                        "lastName": {
                          "type": "string",
                          "example": "DOE"
                        },
                        "email": {
                          "type": "string",
                          "example": "johndoe@example.com"
                        },
                        "gender": {
                          "type": "string",
                          "example": "M"
                        },
                        "specialization": {
                          "type": "string",
                          "example": "Cardiology"
                        },
                        "bio": {
                          "type": "string",
                          "example": "Experienced cardiologist with over 10 years of practice."
                        },
                        "dob": {
                          "type": "string",
                          "example": "1980-05-20"
                        },
                        "phone": {
                          "type": "string",
                          "example": "1234567890"
                        },
                        "contact": {
                          "type": "object",
                          "properties": {
                            "address": {
                              "type": "string",
                              "example": "123 Main St"
                            },
                            "city": {
                              "type": "string",
                              "example": "Springfield"
                            },
                            "state": {
                              "type": "string",
                              "example": "IL"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request - Invalid input data",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "object",
                          "example": {
                            "email": "email already exists"
                          }
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal Server Error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/doctors/connect": {
          "get": {
            "summary": "Connect a doctor and create a session token - for doctor.",
            "description": "Authenticates a doctor using Basic Auth credentials in the format `email:password`, where the credentials are base64 encoded. On successful authentication, a session token is generated and returned.\n\n**Authentication:**\n- Basic Auth is required with credentials in the format `email:password` encoded in Base64.\n\n**Request Headers:**\n- `Authorization` (header, required): Basic Authentication credentials encoded in Base64. Example: `Basic dXNlcjpzZWNyZXQxMjM=`\n\n**Response:**\n- On success: Returns the session token for the authenticated doctor.\n- On error: Provides details about missing credentials, invalid credentials, or server issues.\n",
            "tags": [
              "Doctors"
            ],
            "security": [
              {
                "basicAuth": []
              }
            ],
            "responses": {
              "200": {
                "description": "Successfully authenticated the doctor and created a session token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "token": {
                          "type": "string",
                          "description": "The session token for the authenticated doctor",
                          "example": "84f86045-a8a6-4ef1-bbbd-b4c9c4796be7"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request - Missing email or password",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating missing email or password",
                          "example": "Bad Request: Missing email or password"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid credentials or wrong password",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating missing or invalid Authorization header, or wrong credentials or password",
                          "example": "Unauthorized: Missing or invalid Authorization header"
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Not Found - Doctor not registered",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating the doctor was not found",
                          "example": "Doctor not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error - Unexpected error during authentication",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating an internal server error",
                          "example": "Internal Server Error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/doctors/disconnect": {
          "get": {
            "summary": "Disconnect a doctor by removing their session token - for doctor.",
            "description": "Logs out a doctor by deleting their session token from Redis, effectively ending their session. This endpoint requires the doctor to be authenticated with a valid session token.\n\n**Authentication:**\n- Token-based authentication is used, where the token should be passed in the `X-Token` header.\n- The `X-Token` value must be a valid session token issued during login.\n- Requires a role of `doctor`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n",
            "tags": [
              "Doctors"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Successfully disconnected the doctor",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": {
                          "type": "string",
                          "description": "Success message indicating that the doctor has been successfully disconnected",
                          "example": "Successfully disconnected"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request - Missing token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating a missing or invalid token",
                          "example": "Bad Request: Missing token"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating an invalid or expired token",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error - Unexpected error during disconnection",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating an internal server error",
                          "example": "Internal Server Error: Unexpected error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/doctors/{id}": {
          "get": {
            "summary": "Retrieve a doctor's own details - for doctor.",
            "description": "Fetches the details of the authenticated doctor by their ID. This endpoint requires the doctor to be authenticated with a valid session token and must be performed by the doctor who owns the profile.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `doctor`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n- `id` (path, required): The unique identifier of the doctor.\n\n**Response:**\n- On success: Returns the details of the authenticated doctor, including fields such as `_id`, `firstName`, `lastName`, `email`, `gender`, `specialization`, `bio`, `dob`, `phone`, and more.\n- On error: Provides details about issues such as invalid token, doctor not found, or server errors.\n",
            "tags": [
              "Doctors"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "id",
                "in": "path",
                "description": "The unique identifier of the doctor to retrieve.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "60c72b2f9b1e8a5e4c8b4567"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Doctor details retrieved successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string",
                          "description": "The unique identifier of the doctor.",
                          "example": "66c5c864a73c8c2f1cbad794"
                        },
                        "firstName": {
                          "type": "string",
                          "example": "John"
                        },
                        "lastName": {
                          "type": "string",
                          "example": "Doe"
                        },
                        "email": {
                          "type": "string",
                          "example": "johndoe@example.com"
                        },
                        "password": {
                          "type": "string",
                          "description": "Hashed password of the doctor (not usually returned in responses for security reasons).",
                          "example": "$2b$10$tD12oUKX6xnnIXfVzbFtOu00EN/VTdtWY5wIGOBkqfAYZ3wUkrGYy"
                        },
                        "gender": {
                          "type": "string",
                          "example": "M"
                        },
                        "specialization": {
                          "type": "string",
                          "example": "Cardiology"
                        },
                        "patients": {
                          "type": "array",
                          "items": {
                            "type": "object"
                          },
                          "example": []
                        },
                        "sessions": {
                          "type": "array",
                          "items": {
                            "type": "object"
                          },
                          "example": []
                        },
                        "bio": {
                          "type": "string",
                          "example": "Experienced cardiologist with over 10 years of practice."
                        },
                        "phone": {
                          "type": "string",
                          "example": "1234567890"
                        },
                        "dob": {
                          "type": "string",
                          "example": "1980-05-20"
                        },
                        "createdAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-21T10:58:44.532Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-21T11:36:03.155Z"
                        },
                        "__v": {
                          "type": "integer",
                          "example": 0
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request - Missing token or invalid request",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Bad Request: Missing token or invalid request"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only doctor can access this route. Please login as doctor."
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Doctor not found",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Doctor not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal server error"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "put": {
            "summary": "Update a doctor's own details - for doctor.",
            "description": "Updates the authenticated doctor's details. This endpoint requires authentication with a valid session token and must be performed by the doctor who owns the profile.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `doctor`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n- `id` (path, required): The unique identifier of the doctor to update.\n\n**Request Body:**\n- Required fields: `firstName`, `lastName`, `password` (if updating, must be confirmed and meet strength criteria), `confirmPassword` (must match `password`), `gender` (must be 'M' or 'F'), `specialization`, `bio`, `dob`, `phone`, `address`, `city`, `state`.\n- Note: The `email` cannot be updated.\n\n**Response:**\n- On success: Returns the updated details of the doctor, including fields such as `_id`, `firstName`, `lastName`, `email`, `gender`, `specialization`, `bio`, `dob`, `phone`, and more.\n- On error: Provides details about validation issues, unauthorized access, or server errors.\n",
            "tags": [
              "Doctors"
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "id",
                "in": "path",
                "description": "The unique identifier of the doctor to retrieve.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c5c864a73c8c2f1cbad794"
                }
              }
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "firstName": {
                        "type": "string",
                        "example": "Jenna"
                      },
                      "lastName": {
                        "type": "string",
                        "example": "Dean"
                      },
                      "email": {
                        "type": "string",
                        "example": "jennadean@example.com"
                      },
                      "password": {
                        "type": "string",
                        "example": "newP@ssw0rd!"
                      },
                      "confirmPassword": {
                        "type": "string",
                        "example": "newP@ssw0rd!"
                      },
                      "gender": {
                        "type": "string",
                        "example": "F"
                      },
                      "specialization": {
                        "type": "string",
                        "example": "Dermatology"
                      },
                      "bio": {
                        "type": "string",
                        "example": "Experienced dermatologist with over 15 years of practice."
                      },
                      "dob": {
                        "type": "string",
                        "example": "1975-02-10"
                      },
                      "phone": {
                        "type": "string",
                        "example": "1234567899"
                      },
                      "contact": {
                        "type": "object",
                        "properties": {
                          "address": {
                            "type": "string",
                            "example": "1234 Sunset Blvd"
                          },
                          "city": {
                            "type": "string",
                            "example": "Los Angeles"
                          },
                          "state": {
                            "type": "string",
                            "example": "CA"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Doctor details retrieved successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string",
                          "description": "The unique identifier of the doctor.",
                          "example": "66c5dc5e9b6ae671e3039018"
                        },
                        "firstName": {
                          "type": "string",
                          "example": "hn"
                        },
                        "lastName": {
                          "type": "string",
                          "example": "Doe"
                        },
                        "email": {
                          "type": "string",
                          "example": "hndoe@example.com"
                        },
                        "password": {
                          "type": "string",
                          "description": "The hashed password of the doctor.",
                          "example": "$2b$10$77L6Qn25dukWrfYbPJ4Zie/GtmnshaKxqIBhSm5e1lOFLS4332rKW"
                        },
                        "gender": {
                          "type": "string",
                          "example": "M"
                        },
                        "specialization": {
                          "type": "string",
                          "example": "Cardiology"
                        },
                        "bio": {
                          "type": "string",
                          "example": "Experienced cardiologist with over 10 years of practice."
                        },
                        "dob": {
                          "type": "string",
                          "example": "1980-05-20"
                        },
                        "phone": {
                          "type": "string",
                          "example": "1234567890"
                        },
                        "patients": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "example": []
                        },
                        "sessions": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "example": []
                        },
                        "createdAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-21T12:23:58.122Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-21T12:23:58.277Z"
                        },
                        "__v": {
                          "type": "integer",
                          "example": 0
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request - Missing ID, invalid request, or validation errors",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "id is required"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only doctor can access this route. Please login as doctor."
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Doctor not found",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Doctor not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal server error"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "delete": {
            "summary": "Delete a doctor's own profile - for doctor.",
            "description": "Deletes the authenticated doctor's profile. A doctor can only delete their own profile using this endpoint.\nThis action requires authentication and must be performed by the doctor who owns the profile.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `doctor`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n- `id` (path, required): The unique identifier of the doctor to delete.\n\n**Response:**\n- On success: Returns a confirmation message indicating that the doctor has been deleted.\n- On error: Provides details about missing ID, unauthorized access, or server errors.\n",
            "tags": [
              "Doctors"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "id",
                "in": "path",
                "description": "The unique identifier of the doctor to delete.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "60c72b2f9b1e8a5e4c8b4567"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Doctor deleted successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": {
                          "type": "string",
                          "example": "Doctor deleted"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request - Missing ID or invalid request",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "id is required"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only doctor can access this route. Please login as doctor."
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Doctor not found",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Doctor not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal server error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/doctors/{id}/sessions/": {
          "get": {
            "summary": "Retrieves all sessions for a specific doctor - for doctor.",
            "description": "Retrieves a list of all sessions for the specified doctor. This endpoint requires authentication with a valid session token and must be performed by an authenticated doctor.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `doctor`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n- `id` (path, required): The unique identifier of the doctor to retrieve all their sessions for.\n- `page` (header, optional): The page number for pagination.\n- `limit` (header, optional): The number of records per page.\n\n**Response:**\n- On success: Returns an array of session objects for the specified doctor.\n- On error: Provides details about validation issues, unauthorized access, or server errors.\n",
            "tags": [
              "Sessions"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "id",
                "in": "path",
                "description": "The ID of the doctor whose sessions are being retrieved.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c5c864a73c8c2f1cbad794"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Sessions retrieved successfully.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string",
                            "example": "66c6d13b50a701dcd952a5e0"
                          },
                          "doctor": {
                            "type": "string",
                            "example": "66c5c864a73c8c2f1cbad794"
                          },
                          "patient": {
                            "type": "string",
                            "example": "66c6d13850a701dcd952a5d6"
                          },
                          "type": {
                            "type": "string",
                            "example": "Consultation"
                          },
                          "date": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-22T10:00:00Z"
                          },
                          "time": {
                            "type": "string",
                            "example": "10:00"
                          },
                          "nextAppointment": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-29T10:00:00Z"
                          },
                          "notes": {
                            "type": "string",
                            "example": "Follow-up in one week to assess blood pressure and adjust treatment if necessary."
                          },
                          "privateNotes": {
                            "type": "string",
                            "example": "Monitor blood pressure closely and assess for potential side effects of Lisinopril. Consider adding additional tests if blood pressure remains uncontrolled or if new symptoms arise."
                          },
                          "prescription": {
                            "type": "string",
                            "example": "20mg Lisinopril daily"
                          },
                          "diagnosis": {
                            "type": "string",
                            "example": "Hypertension"
                          },
                          "labTests": {
                            "type": "string",
                            "example": "Electrolyte panel, Renal function tests"
                          },
                          "radOrders": {
                            "type": "string",
                            "example": "Echocardiogram"
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-22T05:41:35.066Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-22T05:43:55.201Z"
                          },
                          "age": {
                            "type": "integer",
                            "example": 34
                          },
                          "__v": {
                            "type": "integer",
                            "example": 0
                          }
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Validation error or missing required fields.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Bad Request: Missing or invalid fields"
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Not Found - Doctor not found.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Doctor not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal server error.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal server error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/doctors/{id}/sessions/{sessionId}": {
          "get": {
            "summary": "Retrieves a specific session for a doctor - for doctor.",
            "description": "Retrieves details of a specific session for a given doctor. This endpoint requires authentication with a valid session token and must be performed by an authenticated doctor.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `doctor`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n- `id` (path, required): The unique identifier of the doctor.\n- `sessionId` (path, required): The unique identifier of the session to update.\n\n**Response:**\n- On success: Returns the details of the requested session.\n- On error: Provides details about validation issues, unauthorized access, or server errors.\n",
            "tags": [
              "Sessions"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "id",
                "in": "path",
                "description": "The ID of the doctor whose session is being retrieved.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c5c864a73c8c2f1cbad794"
                }
              },
              {
                "name": "sessionId",
                "in": "path",
                "description": "The ID of the session to be retrieved.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c6d13b50a701dcd952a5e0"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Session retrieved successfully.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string",
                          "example": "66c6d13b50a701dcd952a5e0"
                        },
                        "doctor": {
                          "type": "string",
                          "example": "66c5c864a73c8c2f1cbad794"
                        },
                        "patient": {
                          "type": "string",
                          "example": "66c6d13850a701dcd952a5d6"
                        },
                        "type": {
                          "type": "string",
                          "example": "Consultation"
                        },
                        "date": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T10:00:00Z"
                        },
                        "time": {
                          "type": "string",
                          "example": "10:00"
                        },
                        "nextAppointment": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-29T10:00:00Z"
                        },
                        "notes": {
                          "type": "string",
                          "example": "Follow-up in one week to assess blood pressure and adjust treatment if necessary."
                        },
                        "privateNotes": {
                          "type": "string",
                          "example": "Monitor blood pressure closely and assess for potential side effects of Lisinopril. Consider adding additional tests if blood pressure remains uncontrolled or if new symptoms arise."
                        },
                        "prescription": {
                          "type": "string",
                          "example": "20mg Lisinopril daily"
                        },
                        "diagnosis": {
                          "type": "string",
                          "example": "Hypertension"
                        },
                        "labTests": {
                          "type": "string",
                          "example": "Electrolyte panel, Renal function tests"
                        },
                        "radOrders": {
                          "type": "string",
                          "example": "Echocardiogram"
                        },
                        "createdAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T05:41:35.066Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T05:43:55.201Z"
                        },
                        "age": {
                          "type": "integer",
                          "example": 34
                        },
                        "__v": {
                          "type": "integer",
                          "example": 0
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden - Insufficient permissions to access this endpoint",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only doctor can access this route. Please login as doctor."
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Not Found - Doctor or session not found.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Session not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal server error.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal server error"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "put": {
            "summary": "Updates a session for a doctor and patient - for doctor.",
            "description": "Updates a specific session for a given doctor. This endpoint requires authentication with a valid session token and must be performed by an authenticated doctor.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `doctor`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n- `id` (path, required): The unique identifier of the doctor.\n- `sessionId` (path, required): The unique identifier of the session to update.\n\n**Request Body:**\n- Optional fields: `type`, `date`, `time`, `nextAppointment`, `notes`, `privateNotes`, `prescription`, `diagnosis`, `labTests`, `radOrders`.\n\n**Response:**\n- On success: Returns the updated session details.\n- On error: Provides details about validation issues, unauthorized access, or server errors.\n",
            "tags": [
              "Sessions"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "id",
                "in": "path",
                "description": "The ID of the doctor whose session is being updated.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c5c864a73c8c2f1cbad794"
                }
              },
              {
                "name": "sessionId",
                "in": "path",
                "description": "The ID of the session to be updated.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c6d13b50a701dcd952a5e0"
                }
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": [
                          "Consultation",
                          "Follow up",
                          "Routine"
                        ],
                        "description": "The type of session. Defaults to \"Consultation\".",
                        "example": "Consultation"
                      },
                      "date": {
                        "type": "string",
                        "format": "date-time",
                        "description": "The date of the session. Defaults to the current date.",
                        "example": "2024-08-22T10:00:00Z"
                      },
                      "time": {
                        "type": "string",
                        "description": "The time of the session. Defaults to the current time.",
                        "example": "10:00"
                      },
                      "nextAppointment": {
                        "type": "string",
                        "format": "date-time",
                        "description": "The next appointment date for the patient.",
                        "example": "2024-09-03T10:00:00Z"
                      },
                      "notes": {
                        "type": "string",
                        "description": "General notes visible to the doctor and patient.",
                        "example": "Follow-up in one week to assess blood pressure and adjust treatment if necessary."
                      },
                      "privateNotes": {
                        "type": "string",
                        "description": "Private notes visible only to the doctor.",
                        "example": "Monitor blood pressure closely and assess for potential side effects of Lisinopril. Consider adding additional tests if blood pressure remains uncontrolled or if new symptoms arise."
                      },
                      "prescription": {
                        "type": "string",
                        "description": "Any prescription given during the session.",
                        "example": "20mg Lisinopril daily, Hydrochlorothiazide 12.5mg daily"
                      },
                      "diagnosis": {
                        "type": "string",
                        "description": "The diagnosis made during the session.",
                        "example": "Hypertension"
                      },
                      "labTests": {
                        "type": "string",
                        "description": "Any lab tests ordered during the session.",
                        "example": "Electrolyte panel, Renal function tests"
                      },
                      "radOrders": {
                        "type": "string",
                        "description": "Any radiology orders made during the session.",
                        "example": "Echocardiogram"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Session updated successfully.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string",
                          "example": "66c6d13b50a701dcd952a5e0"
                        },
                        "doctor": {
                          "type": "string",
                          "example": "66c5c864a73c8c2f1cbad794"
                        },
                        "patient": {
                          "type": "string",
                          "example": "66c6d13850a701dcd952a5d6"
                        },
                        "type": {
                          "type": "string",
                          "example": "Consultation"
                        },
                        "date": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T10:00:00Z"
                        },
                        "time": {
                          "type": "string",
                          "example": "10:00"
                        },
                        "nextAppointment": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-09-03T10:00:00Z"
                        },
                        "notes": {
                          "type": "string",
                          "example": "Follow-up in one week to assess blood pressure and adjust treatment if necessary."
                        },
                        "privateNotes": {
                          "type": "string",
                          "example": "Monitor blood pressure closely and assess for potential side effects of Lisinopril. Consider adding additional tests if blood pressure remains uncontrolled or if new symptoms arise."
                        },
                        "prescription": {
                          "type": "string",
                          "example": "20mg Lisinopril daily, Hydrochlorothiazide 12.5mg daily"
                        },
                        "diagnosis": {
                          "type": "string",
                          "example": "Hypertension"
                        },
                        "labTests": {
                          "type": "string",
                          "example": "Electrolyte panel, Renal function tests"
                        },
                        "radOrders": {
                          "type": "string",
                          "example": "Echocardiogram"
                        },
                        "createdAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T05:41:35.066Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T05:43:55.201Z"
                        },
                        "age": {
                          "type": "integer",
                          "example": 34
                        },
                        "__v": {
                          "type": "integer",
                          "example": 0
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Validation error or missing required fields.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Bad Request: Missing or invalid fields"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden - Insufficient permissions to access this endpoint",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only doctor can access this route. Please login as doctor."
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Not Found - Doctor or session not found.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Session not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal server error.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal server error"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "delete": {
            "summary": "Deletes a session for a doctor and patient - for doctor.",
            "description": "Deletes a specific session for a given doctor and patient. This endpoint requires authentication with a valid session token and must be performed by an authenticated doctor.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `doctor`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n- `id` (path, required): The unique identifier of the doctor.\n- `sessionId` (path, required): The unique identifier of the patient to retrieve.\n\n**Response:**\n- On success: Redirects to `/sessions/{sessionId}` with status code 307.\n- On error: Provides details about unauthorized access, missing resources, or server errors.\n",
            "tags": [
              "Sessions"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "id",
                "in": "path",
                "description": "The ID of the doctor whose session is being deleted.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c5c864a73c8c2f1cbad794"
                }
              },
              {
                "name": "sessionId",
                "in": "path",
                "description": "The ID of the session to be deleted.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c6d13b50a701dcd952a5e0"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Session deleted successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": {
                          "type": "string",
                          "example": "Session deleted"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden - You are not allowed to delete this session.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "You are not allowed to delete this session"
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Not Found - Doctor or session not found.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Session not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal server error.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal server error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/doctors/{id}/patients/": {
          "get": {
            "summary": "Retrieve a list of patients associated with a specific doctor - for doctor.",
            "description": "Fetches all patients associated with the specified doctor. This endpoint requires authentication with a valid session token and must be performed by an authenticated doctor.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `doctor`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n- `id` (path, required): The unique identifier of the doctor.\n- `page` (header, optional): The page number for pagination.\n- `limit` (header, optional): The number of records per page.\n\n**Response:**\n- On success: Returns a list of patients associated with the doctor, including fields such as `_id`, `firstName`, `lastName`, `gender`, `dob`, `email`, and more.\n- On error: Provides details about not finding the doctor, invalid ID, or server errors.\n",
            "tags": [
              "Patients"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "id",
                "in": "path",
                "description": "The unique identifier of the doctor.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c5c864a73c8c2f1cbad794"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "List of patients associated with the doctor",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "contact": {
                            "type": "object",
                            "properties": {
                              "emergencyContact": {
                                "type": "object",
                                "properties": {
                                  "name": {
                                    "type": "string",
                                    "example": "Jane Doe"
                                  },
                                  "relationship": {
                                    "type": "string",
                                    "example": "Sister"
                                  },
                                  "phone": {
                                    "type": "string",
                                    "example": "0987654321"
                                  }
                                }
                              },
                              "phone": {
                                "type": "string",
                                "example": "1223367890"
                              },
                              "address": {
                                "type": "string",
                                "example": "4321 Elm Avenue"
                              },
                              "city": {
                                "type": "string",
                                "example": "Buffalo"
                              },
                              "state": {
                                "type": "string",
                                "example": "NY"
                              }
                            }
                          },
                          "_id": {
                            "type": "string",
                            "example": "66c6d13850a701dcd952a5d6"
                          },
                          "firstName": {
                            "type": "string",
                            "example": "Johnny"
                          },
                          "lastName": {
                            "type": "string",
                            "example": "Smith"
                          },
                          "gender": {
                            "type": "string",
                            "example": "M"
                          },
                          "bloodGroup": {
                            "type": "string",
                            "example": "O+"
                          },
                          "height": {
                            "type": "string",
                            "example": "175"
                          },
                          "weight": {
                            "type": "string",
                            "example": "70"
                          },
                          "email": {
                            "type": "string",
                            "example": "johnnysmith@example.com"
                          },
                          "doctor": {
                            "type": "string",
                            "example": "66c5c864a73c8c2f1cbad794"
                          },
                          "sessions": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "example": []
                          },
                          "dob": {
                            "type": "string",
                            "example": "1990-05-15"
                          },
                          "medicalHistory": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "example": [
                              "Diabetes",
                              "Hypertension"
                            ]
                          },
                          "currentMedication": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "example": "Insulin"
                                },
                                "startDate": {
                                  "type": "string",
                                  "example": "2024-01-01"
                                },
                                "duration": {
                                  "type": "string",
                                  "example": "6 months"
                                },
                                "dosage": {
                                  "type": "string",
                                  "example": "10 units"
                                },
                                "description": {
                                  "type": "string",
                                  "example": "For diabetes management"
                                },
                                "endDate": {
                                  "type": "string",
                                  "example": "2024-07-01T00:00:00.000Z"
                                },
                                "_id": {
                                  "type": "string",
                                  "example": "66c6d13850a701dcd952a5d7"
                                }
                              }
                            }
                          },
                          "familyHistory": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "medicalCondition": {
                                  "type": "string",
                                  "example": "Heart disease"
                                },
                                "relationship": {
                                  "type": "string",
                                  "example": "Father"
                                },
                                "description": {
                                  "type": "string",
                                  "example": "Had a heart attack at age 60"
                                },
                                "_id": {
                                  "type": "string",
                                  "example": "66c6d13850a701dcd952a5d8"
                                }
                              }
                            }
                          },
                          "insurance": {
                            "type": "string",
                            "example": "HealthPlus"
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-22T05:48:40.893Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-22T05:48:41.009Z"
                          },
                          "age": {
                            "type": "integer",
                            "example": 34
                          },
                          "__v": {
                            "type": "integer",
                            "example": 0
                          }
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden - Insufficient permissions to access this endpoint",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only doctor can access this route. Please login as doctor."
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Doctor not found or invalid ID",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Doctor not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error - Error during processing",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal Server Error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/doctors/{id}/patients/{patientId}": {
          "get": {
            "summary": "Retrieve a specific patient of a doctor - for doctor.",
            "description": "Fetches details of a specific patient associated with a doctor. This endpoint requires authentication with a valid session token and must be performed by an authenticated doctor.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `doctor`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n- `id` (path, required): The unique identifier of the doctor.\n- `patientId` (path, required): The unique identifier of the patient to retrieve.\n\n**Response:**\n- On success: Returns details of the patient, including fields such as `_id`, `firstName`, `lastName`, `gender`, `dob`, `email`, and more.\n- On error: Provides details about validation issues, unauthorized access, or server errors.\n",
            "tags": [
              "Patients"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "id",
                "in": "path",
                "description": "The unique identifier of the doctor.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c5c864a73c8c2f1cbad794"
                }
              },
              {
                "name": "patientId",
                "in": "path",
                "description": "The unique identifier of the patient.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c6d13850a701dcd952a5d6"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Patient details retrieved successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "contact": {
                          "type": "object",
                          "properties": {
                            "emergencyContact": {
                              "type": "object",
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "example": "Jane Doe"
                                },
                                "relationship": {
                                  "type": "string",
                                  "example": "Sister"
                                },
                                "phone": {
                                  "type": "string",
                                  "example": "0987654321"
                                }
                              }
                            },
                            "phone": {
                              "type": "string",
                              "example": "1223367890"
                            },
                            "address": {
                              "type": "string",
                              "example": "4321 Elm Avenue"
                            },
                            "city": {
                              "type": "string",
                              "example": "Buffalo"
                            },
                            "state": {
                              "type": "string",
                              "example": "NY"
                            }
                          }
                        },
                        "_id": {
                          "type": "string",
                          "example": "66c6d13850a701dcd952a5d6"
                        },
                        "firstName": {
                          "type": "string",
                          "example": "Johnny"
                        },
                        "lastName": {
                          "type": "string",
                          "example": "Smith"
                        },
                        "gender": {
                          "type": "string",
                          "example": "M"
                        },
                        "bloodGroup": {
                          "type": "string",
                          "example": "O+"
                        },
                        "height": {
                          "type": "string",
                          "example": "175"
                        },
                        "weight": {
                          "type": "string",
                          "example": "70"
                        },
                        "email": {
                          "type": "string",
                          "example": "johnnysmith@example.com"
                        },
                        "doctor": {
                          "type": "string",
                          "example": "66c5c864a73c8c2f1cbad794"
                        },
                        "sessions": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "example": []
                        },
                        "dob": {
                          "type": "string",
                          "example": "1990-05-15"
                        },
                        "medicalHistory": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "example": [
                            "Diabetes",
                            "Hypertension"
                          ]
                        },
                        "currentMedication": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string",
                                "example": "Insulin"
                              },
                              "startDate": {
                                "type": "string",
                                "example": "2024-01-01"
                              },
                              "duration": {
                                "type": "string",
                                "example": "6 months"
                              },
                              "dosage": {
                                "type": "string",
                                "example": "10 units"
                              },
                              "description": {
                                "type": "string",
                                "example": "For diabetes management"
                              },
                              "endDate": {
                                "type": "string",
                                "example": "2024-07-01T00:00:00.000Z"
                              },
                              "_id": {
                                "type": "string",
                                "example": "66c6d13850a701dcd952a5d7"
                              }
                            }
                          }
                        },
                        "familyHistory": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "medicalCondition": {
                                "type": "string",
                                "example": "Heart disease"
                              },
                              "relationship": {
                                "type": "string",
                                "example": "Father"
                              },
                              "description": {
                                "type": "string",
                                "example": "Had a heart attack at age 60"
                              },
                              "_id": {
                                "type": "string",
                                "example": "66c6d13850a701dcd952a5d8"
                              }
                            }
                          }
                        },
                        "insurance": {
                          "type": "string",
                          "example": "HealthPlus"
                        },
                        "createdAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T05:48:40.893Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T05:48:41.009Z"
                        },
                        "age": {
                          "type": "integer",
                          "example": 34
                        },
                        "__v": {
                          "type": "integer",
                          "example": 0
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden - Insufficient permissions to access this endpoint",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only doctor can access this route. Please login as doctor."
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Doctor or patient not found",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Patient not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error - Error during processing",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal Server Error"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "put": {
            "summary": "Update details of a specific patient of a doctor - for doctor.",
            "description": "Allows a doctor to update the details of a specific patient associated with them. Note that a doctor cannot update a patient's password through this endpoint.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `doctor`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n- `id` (path, required): The unique identifier of the doctor.\n- `patientId` (path, required): The unique identifier of the patient to update.\n\n**Request Body:**\n- An object containing the fields to update. The following fields can be updated: `firstName`, `lastName`, `email`, `gender`, `dob`, `contact.phone`,\n  `bloodGroup`, `height`, `weight`, `contact`: (`address`, `city`, `state`), `emergencyContact`, `medicalHistory`, `currentMedication`, `familyHistory`, and `insurance`.\n- Note: The `password` field is not allowed to be updated by the doctor.\n\n**Response:**\n- On success: Returns the updated details of the patient, excluding the `confirmPassword` field.\n- On error: Provides details about validation issues, unauthorized access, or server errors.\n",
            "tags": [
              "Patients"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "id",
                "in": "path",
                "description": "The unique identifier of the doctor.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c5c864a73c8c2f1cbad794"
                }
              },
              {
                "name": "patientId",
                "in": "path",
                "description": "The unique identifier of the patient.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c6d13850a701dcd952a5d6"
                }
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "firstName": {
                        "type": "string",
                        "example": "Johnny"
                      },
                      "lastName": {
                        "type": "string",
                        "example": "Smith"
                      },
                      "gender": {
                        "type": "string",
                        "example": "M"
                      },
                      "bloodGroup": {
                        "type": "string",
                        "example": "O+"
                      },
                      "height": {
                        "type": "string",
                        "example": "175"
                      },
                      "weight": {
                        "type": "string",
                        "example": "70"
                      },
                      "email": {
                        "type": "string",
                        "example": "johnnysmith@example.com"
                      },
                      "dob": {
                        "type": "string",
                        "example": "1990-05-15"
                      },
                      "medicalHistory": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "example": [
                          "Diabetes",
                          "Hypertension"
                        ]
                      },
                      "currentMedication": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "name": {
                              "type": "string",
                              "example": "Insulin"
                            },
                            "startDate": {
                              "type": "string",
                              "example": "2024-01-01"
                            },
                            "duration": {
                              "type": "string",
                              "example": "6 months"
                            },
                            "dosage": {
                              "type": "string",
                              "example": "10 units"
                            },
                            "description": {
                              "type": "string",
                              "example": "For diabetes management"
                            },
                            "endDate": {
                              "type": "string",
                              "example": "2024-07-01T00:00:00.000Z"
                            }
                          }
                        }
                      },
                      "familyHistory": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "medicalCondition": {
                              "type": "string",
                              "example": "Heart disease"
                            },
                            "relationship": {
                              "type": "string",
                              "example": "Father"
                            },
                            "description": {
                              "type": "string",
                              "example": "Had a heart attack at age 60"
                            }
                          }
                        }
                      },
                      "insurance": {
                        "type": "string",
                        "example": "HealthPlus"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Patient details updated successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "contact": {
                          "type": "object",
                          "properties": {
                            "phone": {
                              "type": "string",
                              "example": "1223367890"
                            },
                            "address": {
                              "type": "string",
                              "example": "4321 Elm Avenue"
                            },
                            "city": {
                              "type": "string",
                              "example": "Buffalo"
                            },
                            "state": {
                              "type": "string",
                              "example": "NY"
                            },
                            "emergencyContact": {
                              "type": "object",
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "example": "Jane Doe"
                                },
                                "relationship": {
                                  "type": "string",
                                  "example": "Sister"
                                },
                                "phone": {
                                  "type": "string",
                                  "example": "0987654321"
                                }
                              }
                            }
                          }
                        },
                        "_id": {
                          "type": "string",
                          "example": "66c6d13850a701dcd952a5d6"
                        },
                        "firstName": {
                          "type": "string",
                          "example": "Johnny"
                        },
                        "lastName": {
                          "type": "string",
                          "example": "Smith"
                        },
                        "gender": {
                          "type": "string",
                          "example": "M"
                        },
                        "bloodGroup": {
                          "type": "string",
                          "example": "O+"
                        },
                        "height": {
                          "type": "string",
                          "example": "175"
                        },
                        "weight": {
                          "type": "string",
                          "example": "70"
                        },
                        "email": {
                          "type": "string",
                          "example": "johnnysmith@example.com"
                        },
                        "doctor": {
                          "type": "string",
                          "example": "66c5c864a73c8c2f1cbad794"
                        },
                        "sessions": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "example": []
                        },
                        "dob": {
                          "type": "string",
                          "example": "1990-05-15"
                        },
                        "medicalHistory": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "example": [
                            "Diabetes",
                            "Hypertension"
                          ]
                        },
                        "currentMedication": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string",
                                "example": "Insulin"
                              },
                              "startDate": {
                                "type": "string",
                                "example": "2024-01-01"
                              },
                              "duration": {
                                "type": "string",
                                "example": "6 months"
                              },
                              "dosage": {
                                "type": "string",
                                "example": "10 units"
                              },
                              "description": {
                                "type": "string",
                                "example": "For diabetes management"
                              },
                              "endDate": {
                                "type": "string",
                                "example": "2024-07-01T00:00:00.000Z"
                              },
                              "_id": {
                                "type": "string",
                                "example": "66c6d13850a701dcd952a5d7"
                              }
                            }
                          }
                        },
                        "familyHistory": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "medicalCondition": {
                                "type": "string",
                                "example": "Heart disease"
                              },
                              "relationship": {
                                "type": "string",
                                "example": "Father"
                              },
                              "description": {
                                "type": "string",
                                "example": "Had a heart attack at age 60"
                              },
                              "_id": {
                                "type": "string",
                                "example": "66c6d13850a701dcd952a5d8"
                              }
                            }
                          }
                        },
                        "insurance": {
                          "type": "string",
                          "example": "HealthPlus"
                        },
                        "createdAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T05:48:40.893Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T05:48:41.009Z"
                        },
                        "age": {
                          "type": "integer",
                          "example": 34
                        },
                        "__v": {
                          "type": "integer",
                          "example": 0
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request - Invalid input data",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Validation Error"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Doctor or patient not found",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Patient not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error - Error during processing",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal Server Error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/connect": {
          "get": {
            "summary": "Connect a dev and create a session token - for dev.",
            "description": "Authenticates a dev using Basic Auth credentials in the format `email:password`, where the credentials are base64 encoded. On successful authentication, a session token is generated and returned.\n\n**Authentication:**\n- Basic Auth is required with credentials in the format `email:password` encoded in Base64.\n\n**Request Headers:**\n- `Authorization` (header, required): Basic Authentication credentials encoded in Base64. Example: `Basic dXNlcjpzZWNyZXQxMjM=`\n\n**Response:**\n- On success: Returns the session token for the authenticated dev.\n- On error: Provides details about missing credentials, invalid credentials, or server issues.\n",
            "tags": [
              "Devs"
            ],
            "security": [
              {
                "basicAuth": []
              }
            ],
            "responses": {
              "200": {
                "description": "Successfully authenticated the dev and created a session token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "token": {
                          "type": "string",
                          "description": "The session token for the authenticated dev",
                          "example": "84f86045-a8a6-4ef1-bbbd-b4c9c4796be7"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request - Missing email or password",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating missing email or password",
                          "example": "Bad Request: Missing email or password"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid credentials or wrong password",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating missing or invalid Authorization header, or wrong credentials or password",
                          "example": "Unauthorized: Missing or invalid Authorization header"
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Not Found - Dev not registered",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating the dev was not found",
                          "example": "Dev not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error - Unexpected error during authentication",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating an internal server error",
                          "example": "Internal Server Error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/disconnect": {
          "get": {
            "summary": "Disconnect a dev by removing their session token - for dev.",
            "description": "Logs out a dev by deleting their session token from Redis, effectively ending their session. This endpoint requires the dev to be authenticated with a valid session token.\n\n**Authentication:**\n- Token-based authentication is used, where the token should be passed in the `X-Token` header.\n- The `X-Token` value must be a valid session token issued during login.\n- Requires a role of `dev`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n",
            "tags": [
              "Devs"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Successfully disconnected the dev",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": {
                          "type": "string",
                          "description": "Success message indicating that the dev has been successfully disconnected",
                          "example": "Successfully disconnected"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request - Missing token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating a missing or invalid token",
                          "example": "Bad Request: Missing token"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating an invalid or expired token",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error - Unexpected error during disconnection",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating an internal server error",
                          "example": "Internal Server Error: Unexpected error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/patients": {
          "get": {
            "summary": "Retrieve a list of all patients - for dev.",
            "description": "**Note:** This endpoint is intended for development and testing purposes only. It should not be used in production environments with real patient data.\nRetrieves a list of all patients with optional pagination. This endpoint is restricted to users with the 'dev' role and requires authentication using a valid token in the `x-token` header.\n\n**Authentication:**\n- Bearer Token via `x-token` header.\n- Requires a role of `dev`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token.\n- `page` (header, optional): The page number for pagination.\n- `limit` (header, optional): Optional. The number of records per page.\n\n**Response:**\n- A list of patients objects, each containing details such as `_id`, `firstName`, `lastName`, `email`, `doctor`, `medicalHistory`, and more.\n",
            "tags": [
              "Patients"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "page",
                "in": "query",
                "description": "The page number to retrieve (for pagination).",
                "required": false,
                "schema": {
                  "type": "integer",
                  "example": 1
                }
              },
              {
                "name": "limit",
                "in": "query",
                "description": "The number of records to retrieve per page (for pagination).",
                "required": false,
                "schema": {
                  "type": "integer",
                  "example": 10
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Patient details retrieved successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "contact": {
                            "type": "object",
                            "properties": {
                              "emergencyContact": {
                                "type": "object",
                                "properties": {
                                  "name": {
                                    "type": "string",
                                    "example": "Jane Doe"
                                  },
                                  "relationship": {
                                    "type": "string",
                                    "example": "Sister"
                                  },
                                  "phone": {
                                    "type": "string",
                                    "example": "0987654321"
                                  }
                                }
                              },
                              "phone": {
                                "type": "string",
                                "example": "1223367890"
                              },
                              "address": {
                                "type": "string",
                                "example": "4321 Elm Avenue"
                              },
                              "city": {
                                "type": "string",
                                "example": "Buffalo"
                              },
                              "state": {
                                "type": "string",
                                "example": "NY"
                              }
                            }
                          },
                          "_id": {
                            "type": "string",
                            "example": "66c6d13850a701dcd952a5d6"
                          },
                          "firstName": {
                            "type": "string",
                            "example": "Johnny"
                          },
                          "lastName": {
                            "type": "string",
                            "example": "SMITH"
                          },
                          "gender": {
                            "type": "string",
                            "example": "M"
                          },
                          "bloodGroup": {
                            "type": "string",
                            "example": "AB+"
                          },
                          "height": {
                            "type": "string",
                            "example": "178"
                          },
                          "weight": {
                            "type": "string",
                            "example": "73"
                          },
                          "email": {
                            "type": "string",
                            "example": "johnnysmith@example.com"
                          },
                          "password": {
                            "type": "string",
                            "example": "$2b$10$d.5gwKMN95RgNUxp5hNC9.fqziH9jOzart6hE1a.H/Azixh.cDQFS"
                          },
                          "doctor": {
                            "type": "string",
                            "example": "66c5c864a73c8c2f1cbad794"
                          },
                          "sessions": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "example": "66bd759627dcebf1b674ec0f"
                            }
                          },
                          "dob": {
                            "type": "string",
                            "format": "date",
                            "example": "1990-05-15"
                          },
                          "medicalHistory": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "example": "Diabetes"
                            }
                          },
                          "currentMedication": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "example": "Insulin"
                                },
                                "startDate": {
                                  "type": "string",
                                  "format": "date",
                                  "example": "2024-01-01"
                                },
                                "duration": {
                                  "type": "string",
                                  "example": "6 months"
                                },
                                "dosage": {
                                  "type": "string",
                                  "example": "10 units"
                                },
                                "description": {
                                  "type": "string",
                                  "example": "For diabetes management"
                                },
                                "endDate": {
                                  "type": "string",
                                  "format": "date-time",
                                  "example": "2024-07-01T00:00:00.000Z"
                                },
                                "_id": {
                                  "type": "string",
                                  "example": "66c6ee48c5f7397a4d60897a"
                                }
                              }
                            }
                          },
                          "familyHistory": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "medicalCondition": {
                                  "type": "string",
                                  "example": "Heart disease"
                                },
                                "relationship": {
                                  "type": "string",
                                  "example": "Father"
                                },
                                "description": {
                                  "type": "string",
                                  "example": "Had a heart attack at age 60"
                                },
                                "_id": {
                                  "type": "string",
                                  "example": "66c6ee48c5f7397a4d60897b"
                                }
                              }
                            }
                          },
                          "insurance": {
                            "type": "string",
                            "example": "HealthPlus"
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-22T05:48:40.893Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-22T12:09:02.071Z"
                          },
                          "age": {
                            "type": "integer",
                            "example": 34
                          },
                          "__v": {
                            "type": "integer",
                            "example": 0
                          }
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden - Access restricted to 'dev' role",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only users with 'dev' role can access this route."
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal server error"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "post": {
            "summary": "Add a new patient to a doctor's patients - for doctor.",
            "description": "Adds a new patient to the system. This endpoint requires authentication with a valid session token and must be performed by an authenticated doctor.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `doctor`.\n\n**Request Body:**\n- Required fields: `firstName`, `lastName`,  `email`, `password`, `confirmPassword`, `gender`, `dob`, `Contact.phone`, `doctorId`.\n- Optional fields: `bloodGroup`, `height`, `weight`, `Contact`: (`address`, `city`, `state`), `emergencyContact`, `medicalHistory`, `currentMedication`, `familyHistory`, `insurance`.\n\n**Response:**\n- On success: Returns the details of the newly created patient, including fields such as `_id`, `firstName`, `lastName`, `gender`, `dob`, `email`, and more.\n- On error: Provides details about validation issues, unauthorized access, or server errors.\n",
            "tags": [
              "Patients"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "firstName": {
                        "type": "string",
                        "example": "Johnny"
                      },
                      "lastName": {
                        "type": "string",
                        "example": "Smith"
                      },
                      "gender": {
                        "type": "string",
                        "example": "M"
                      },
                      "dob": {
                        "type": "string",
                        "example": "1990-05-15"
                      },
                      "email": {
                        "type": "string",
                        "example": "johnnysmith@example.com"
                      },
                      "password": {
                        "type": "string",
                        "example": "secureP@ssw0rd"
                      },
                      "confirmPassword": {
                        "type": "string",
                        "example": "secureP@ssw0rd"
                      },
                      "doctor": {
                        "type": "string",
                        "example": "66c5c864a73c8c2f1cbad794"
                      },
                      "bloodGroup": {
                        "type": "string",
                        "example": "O+"
                      },
                      "height": {
                        "type": "string",
                        "example": "175"
                      },
                      "weight": {
                        "type": "string",
                        "example": "70"
                      },
                      "contact": {
                        "type": "object",
                        "properties": {
                          "phone": {
                            "type": "string",
                            "example": "1223367890"
                          },
                          "address": {
                            "type": "string",
                            "example": "4321 Elm Avenue"
                          },
                          "city": {
                            "type": "string",
                            "example": "Buffalo"
                          },
                          "state": {
                            "type": "string",
                            "example": "NY"
                          },
                          "emergencyContact": {
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string",
                                "example": "Jane Doe"
                              },
                              "relationship": {
                                "type": "string",
                                "example": "Sister"
                              },
                              "phone": {
                                "type": "string",
                                "example": "0987654321"
                              }
                            }
                          }
                        }
                      },
                      "medicalHistory": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "example": [
                          "Diabetes",
                          "Hypertension"
                        ]
                      },
                      "currentMedication": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "name": {
                              "type": "string",
                              "example": "Insulin"
                            },
                            "startDate": {
                              "type": "string",
                              "example": "2024-01-01"
                            },
                            "duration": {
                              "type": "string",
                              "example": "6 months"
                            },
                            "dosage": {
                              "type": "string",
                              "example": "10 units"
                            },
                            "description": {
                              "type": "string",
                              "example": "For diabetes management"
                            },
                            "endDate": {
                              "type": "string",
                              "example": "2024-07-01"
                            }
                          }
                        }
                      },
                      "familyHistory": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "medicalCondition": {
                              "type": "string",
                              "example": "Heart disease"
                            },
                            "relationship": {
                              "type": "string",
                              "example": "Father"
                            },
                            "description": {
                              "type": "string",
                              "example": "Had a heart attack at age 60"
                            }
                          }
                        }
                      },
                      "insurance": {
                        "type": "string",
                        "example": "HealthPlus"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Patient created successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "firstName": {
                          "type": "string",
                          "example": "Johnny"
                        },
                        "lastName": {
                          "type": "string",
                          "example": "SMITH"
                        },
                        "gender": {
                          "type": "string",
                          "example": "M"
                        },
                        "bloodGroup": {
                          "type": "string",
                          "example": "O+"
                        },
                        "height": {
                          "type": "string",
                          "example": "175"
                        },
                        "weight": {
                          "type": "string",
                          "example": "70"
                        },
                        "email": {
                          "type": "string",
                          "example": "johnnysmith@example.com"
                        },
                        "password": {
                          "type": "string",
                          "example": "$2b$10$uac4af8ApINZECNONY7Gh.Ep2eKRQtX6Jq4zm04vGA0OeVjfxBWO2"
                        },
                        "doctor": {
                          "type": "string",
                          "example": "66c5c864a73c8c2f1cbad794"
                        },
                        "sessions": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "example": []
                        },
                        "contact": {
                          "type": "object",
                          "properties": {
                            "phone": {
                              "type": "string",
                              "example": "1223367890"
                            },
                            "address": {
                              "type": "string",
                              "example": "4321 Elm Avenue"
                            },
                            "city": {
                              "type": "string",
                              "example": "Buffalo"
                            },
                            "state": {
                              "type": "string",
                              "example": "NY"
                            },
                            "emergencyContact": {
                              "type": "object",
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "example": "Jane Doe"
                                },
                                "relationship": {
                                  "type": "string",
                                  "example": "Sister"
                                },
                                "phone": {
                                  "type": "string",
                                  "example": "0987654321"
                                }
                              }
                            }
                          }
                        },
                        "dob": {
                          "type": "string",
                          "example": "1990-05-15"
                        },
                        "medicalHistory": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "example": [
                            "Diabetes",
                            "Hypertension"
                          ]
                        },
                        "currentMedication": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string",
                                "example": "Insulin"
                              },
                              "startDate": {
                                "type": "string",
                                "example": "2024-01-01"
                              },
                              "duration": {
                                "type": "string",
                                "example": "6 months"
                              },
                              "dosage": {
                                "type": "string",
                                "example": "10 units"
                              },
                              "description": {
                                "type": "string",
                                "example": "For diabetes management"
                              },
                              "endDate": {
                                "type": "string",
                                "example": "2024-07-01T00:00:00.000Z"
                              },
                              "_id": {
                                "type": "string",
                                "example": "66c6d13850a701dcd952a5d7"
                              }
                            }
                          }
                        },
                        "familyHistory": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "medicalCondition": {
                                "type": "string",
                                "example": "Heart disease"
                              },
                              "relationship": {
                                "type": "string",
                                "example": "Father"
                              },
                              "description": {
                                "type": "string",
                                "example": "Had a heart attack at age 60"
                              },
                              "_id": {
                                "type": "string",
                                "example": "66c6d13850a701dcd952a5d8"
                              }
                            }
                          }
                        },
                        "insurance": {
                          "type": "string",
                          "example": "HealthPlus"
                        },
                        "_id": {
                          "type": "string",
                          "description": "The unique identifier of the patient.",
                          "example": "66c6cf8fb5fb0ccefe9fb501"
                        },
                        "createdAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T05:41:35.066Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T05:41:35.201Z"
                        },
                        "age": {
                          "type": "integer",
                          "example": 34
                        },
                        "__v": {
                          "type": "integer",
                          "example": 0
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request - Missing required fields or validation errors",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Bad Request: Missing token"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden - Insufficient permissions to access this endpoint",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only doctor can access this route. Please login as doctor."
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error - Error during processing",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal Server Error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/patients/connect": {
          "get": {
            "summary": "Connect a patient and create a session token - for patient.",
            "description": "Authenticates a patient using Basic Auth credentials in the format `email:password`, where the credentials are base64 encoded. On successful authentication, a session token is generated and returned.\n\n**Authentication:**\n- Basic Auth is required with credentials in the format `email:password` encoded in Base64.\n\n**Request Headers:**\n- `Authorization` (header, required): Basic Authentication credentials encoded in Base64. Example: `Basic dXNlcjpzZWNyZXQxMjM=`\n\n**Response:**\n- On success: Returns the session token for the authenticated patient.\n- On error: Provides details about missing credentials, invalid credentials, or server issues.\n",
            "tags": [
              "Patients"
            ],
            "security": [
              {
                "basicAuth": []
              }
            ],
            "responses": {
              "200": {
                "description": "Successfully authenticated the patient and created a session token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "token": {
                          "type": "string",
                          "description": "The session token for the authenticated patient",
                          "example": "84f86045-a8a6-4ef1-bbbd-b4c9c4796be7"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request - Missing email or password",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating missing email or password",
                          "example": "Bad Request: Missing email or password"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid credentials or wrong password",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating missing or invalid Authorization header, or wrong credentials or password",
                          "example": "Unauthorized: Missing or invalid Authorization header"
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Not Found - Patient not registered",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating the patient was not found",
                          "example": "Patient not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error - Unexpected error during authentication",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating an internal server error",
                          "example": "Internal Server Error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/patients/disconnect": {
          "get": {
            "summary": "Disconnect a patient by removing their session token - for patient.",
            "description": "Logs out a patient by deleting their session token from Redis, effectively ending their session. This endpoint requires the patient to be authenticated with a valid session token.\n\n**Authentication:**\n- Token-based authentication is used, where the token should be passed in the `X-Token` header.\n- The `X-Token` value must be a valid session token issued during login.\n- Requires a role of `patient`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n",
            "tags": [
              "Patients"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Successfully disconnected the patient",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": {
                          "type": "string",
                          "description": "Success message indicating that the patient has been successfully disconnected",
                          "example": "Successfully disconnected"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request - Missing token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating a missing or invalid token",
                          "example": "Bad Request: Missing token"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating an invalid or expired token",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error - Unexpected error during disconnection",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "description": "Error message indicating an internal server error",
                          "example": "Internal Server Error: Unexpected error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/patients/{id}": {
          "get": {
            "summary": "Retrieve a patient's own details - for patient.",
            "description": "Fetches the details of the authenticated patient by their ID. This endpoint requires the patient to be authenticated with a valid session token and must be performed by the patient who owns the profile.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `patient`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n- `id` (path, required): The unique identifier of the patient.\n\n**Response:**\n- On success: Returns the details of the authenticated patient, including fields such as `_id`, `firstName`, `lastName`, `email`, `contact`, `medicalHistory`, `familyHistory`, and more.\n- On error: Provides details about issues such as invalid token, patient not found, or server errors.\n",
            "tags": [
              "Patients"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "id",
                "in": "path",
                "description": "The unique identifier of the patinet to retrieve.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "60c72b2f9b1e8a5e4c8b4567"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Patient details retrieved successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "contact": {
                          "type": "object",
                          "properties": {
                            "emergencyContact": {
                              "type": "object",
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "example": "Jane Doe"
                                },
                                "relationship": {
                                  "type": "string",
                                  "example": "Sister"
                                },
                                "phone": {
                                  "type": "string",
                                  "example": "0987654321"
                                }
                              }
                            },
                            "phone": {
                              "type": "string",
                              "example": "1223367890"
                            },
                            "address": {
                              "type": "string",
                              "example": "4321 Elm Avenue"
                            },
                            "city": {
                              "type": "string",
                              "example": "Buffalo"
                            },
                            "state": {
                              "type": "string",
                              "example": "NY"
                            }
                          }
                        },
                        "_id": {
                          "type": "string",
                          "example": "66c6d13850a701dcd952a5d6"
                        },
                        "firstName": {
                          "type": "string",
                          "example": "Johnny"
                        },
                        "lastName": {
                          "type": "string",
                          "example": "SMITH"
                        },
                        "gender": {
                          "type": "string",
                          "example": "M"
                        },
                        "bloodGroup": {
                          "type": "string",
                          "example": "AB+"
                        },
                        "height": {
                          "type": "string",
                          "example": "178"
                        },
                        "weight": {
                          "type": "string",
                          "example": "73"
                        },
                        "email": {
                          "type": "string",
                          "example": "johnnysmith@example.com"
                        },
                        "password": {
                          "type": "string",
                          "example": "$2b$10$d.5gwKMN95RgNUxp5hNC9.fqziH9jOzart6hE1a.H/Azixh.cDQFS"
                        },
                        "doctor": {
                          "type": "string",
                          "example": "66c5c864a73c8c2f1cbad794"
                        },
                        "sessions": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "example": "66bd759627dcebf1b674ec0f"
                          }
                        },
                        "dob": {
                          "type": "string",
                          "format": "date",
                          "example": "1990-05-15"
                        },
                        "medicalHistory": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "example": "Diabetes"
                          }
                        },
                        "currentMedication": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string",
                                "example": "Insulin"
                              },
                              "startDate": {
                                "type": "string",
                                "format": "date",
                                "example": "2024-01-01"
                              },
                              "duration": {
                                "type": "string",
                                "example": "6 months"
                              },
                              "dosage": {
                                "type": "string",
                                "example": "10 units"
                              },
                              "description": {
                                "type": "string",
                                "example": "For diabetes management"
                              },
                              "endDate": {
                                "type": "string",
                                "format": "date-time",
                                "example": "2024-07-01T00:00:00.000Z"
                              },
                              "_id": {
                                "type": "string",
                                "example": "66c6ee48c5f7397a4d60897a"
                              }
                            }
                          }
                        },
                        "familyHistory": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "medicalCondition": {
                                "type": "string",
                                "example": "Heart disease"
                              },
                              "relationship": {
                                "type": "string",
                                "example": "Father"
                              },
                              "description": {
                                "type": "string",
                                "example": "Had a heart attack at age 60"
                              },
                              "_id": {
                                "type": "string",
                                "example": "66c6ee48c5f7397a4d60897b"
                              }
                            }
                          }
                        },
                        "insurance": {
                          "type": "string",
                          "example": "HealthPlus"
                        },
                        "createdAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T05:48:40.893Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T12:09:02.071Z"
                        },
                        "age": {
                          "type": "integer",
                          "example": 34
                        },
                        "__v": {
                          "type": "integer",
                          "example": 6
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request - Missing token or invalid request",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Bad Request: Missing token or invalid request"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only patient can access this route. Please login as patient."
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Patient not found",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Patient not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal server error"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "patch": {
            "summary": "Update a patient's password - for patient.",
            "description": "Updates the password for the authenticated patient. This endpoint requires authentication with a valid session token and must be performed by the patient who owns the profile. The new password must be confirmed by providing the same value in the `confirmPassword` field.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `patient`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n- `id` (path, required): The unique identifier of the patient to update.\n\n**Request Body:**\n- Required fields: `password`, `confirmPassword`\n- Note: `password` must be confirmed by `confirmPassword` and meet strength criteria.\n\n**Response:**\n- On success: Returns the updated details of the patient, including fields such as `_id`, `firstName`, `lastName`, `email`, and other relevant patient information.\n- On error: Provides details about validation issues, unauthorized access, or server errors.\n",
            "tags": [
              "Patients"
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "id",
                "in": "path",
                "description": "The unique identifier of the patient to update.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c6d13850a701dcd952a5d6"
                }
              }
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "password": {
                        "type": "string",
                        "example": "NewSecurePassword123!"
                      },
                      "confirmPassword": {
                        "type": "string",
                        "example": "NewSecurePassword123!"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Patient password updated successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string",
                          "description": "The unique identifier of the patient.",
                          "example": "66c6d13850a701dcd952a5d6"
                        },
                        "firstName": {
                          "type": "string",
                          "example": "Johnny"
                        },
                        "lastName": {
                          "type": "string",
                          "example": "Smith"
                        },
                        "email": {
                          "type": "string",
                          "example": "johnnysmith@example.com"
                        },
                        "contact": {
                          "type": "object",
                          "properties": {
                            "emergencyContact": {
                              "type": "object",
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "example": "Jane Doe"
                                },
                                "relationship": {
                                  "type": "string",
                                  "example": "Sister"
                                },
                                "phone": {
                                  "type": "string",
                                  "example": "0987654321"
                                }
                              }
                            },
                            "phone": {
                              "type": "string",
                              "example": "1223367890"
                            },
                            "address": {
                              "type": "string",
                              "example": "4321 Elm Avenue"
                            },
                            "city": {
                              "type": "string",
                              "example": "Buffalo"
                            },
                            "state": {
                              "type": "string",
                              "example": "NY"
                            }
                          }
                        },
                        "gender": {
                          "type": "string",
                          "example": "M"
                        },
                        "bloodGroup": {
                          "type": "string",
                          "example": "AB+"
                        },
                        "height": {
                          "type": "string",
                          "example": "178"
                        },
                        "weight": {
                          "type": "string",
                          "example": "73"
                        },
                        "doctor": {
                          "type": "string",
                          "example": "66c5c864a73c8c2f1cbad794"
                        },
                        "sessions": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "example": [
                            "66bd759627dcebf1b674ec0f",
                            "66bd75df27dcebf1b674ec2d",
                            "66c7147f4cade6c9c617bc7f",
                            "66c715074cade6c9c617bc87",
                            "66c7150a4cade6c9c617bc8f",
                            "66c72a5dacb3da59eb2f98c0"
                          ]
                        },
                        "dob": {
                          "type": "string",
                          "example": "1990-05-15"
                        },
                        "medicalHistory": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          },
                          "example": [
                            "Diabetes",
                            "Hypertension"
                          ]
                        },
                        "currentMedication": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string",
                                "example": "Insulin"
                              },
                              "startDate": {
                                "type": "string",
                                "format": "date",
                                "example": "2024-01-01"
                              },
                              "duration": {
                                "type": "string",
                                "example": "6 months"
                              },
                              "dosage": {
                                "type": "string",
                                "example": "10 units"
                              },
                              "description": {
                                "type": "string",
                                "example": "For diabetes management"
                              },
                              "endDate": {
                                "type": "string",
                                "format": "date-time",
                                "example": "2024-07-01T00:00:00.000Z"
                              }
                            }
                          }
                        },
                        "familyHistory": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "medicalCondition": {
                                "type": "string",
                                "example": "Heart disease"
                              },
                              "relationship": {
                                "type": "string",
                                "example": "Father"
                              },
                              "description": {
                                "type": "string",
                                "example": "Had a heart attack at age 60"
                              }
                            }
                          }
                        },
                        "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T12:09:02.071Z"
                        },
                        "__v": {
                          "type": "integer",
                          "example": 0
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request - Missing password, invalid request, or validation errors",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Password is required"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden - User is not allowed to access this route",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only patient can access this route. Please login as patient."
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Patient not found",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Patient not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal server error"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "delete": {
            "summary": "Deletes a patient record - for doctor.",
            "description": "Deletes a patient by their ID from the system. This endpoint requires authentication with a valid session token and must be performed by an authenticated doctor.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `doctor`.\n\n**Request Parameters:**\n- `id` (required): The unique identifier of the patient to be deleted.\n\n**Response:**\n- On success: Returns a success message indicating the patient was deleted.\n- On error: Provides details about unauthorized access, patient not found, or server errors.\n",
            "tags": [
              "Patients"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "in": "path",
                "name": "id",
                "required": true,
                "schema": {
                  "type": "string",
                  "description": "The ID of the patient to delete.",
                  "example": "66c6fc10372e2c1d54da3418"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Patient successfully deleted.",
                "content": {
                  "application/json": {
                    "example": {
                      "error": "Patient deleted"
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request - Missing ID or invalid request",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "id is required"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only doctor can access this route. Please login as doctor."
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Patient not found or doctor not authorized.",
                "content": {
                  "application/json": {
                    "example": {
                      "error": "Patient not found"
                    }
                  }
                }
              },
              "500": {
                "description": "Server error.",
                "content": {
                  "application/json": {
                    "example": {
                      "error": "Internal server error"
                    }
                  }
                }
              }
            }
          }
        },
        "/patients/{id}/sessions/": {
          "get": {
            "summary": "Retrieve a list of sessions associated with a specific patient - for patient.",
            "description": "Fetches all sessions associated with the specified patient. This endpoint requires authentication with a valid session token and must be performed by an authenticated patient.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `patient`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n- `id` (path, required): The unique identifier of the patient.\n- `page` (header, optional): The page number for pagination.\n- `limit` (header, optional): The number of records per page.\n\n**Response:**\n- On success: Returns a list of sessions associated with the patient, including fields such as `_id`, `doctor`, `date`, `type`, and more.\n- On error: Provides details about not finding the session, invalid ID, or server errors.\n",
            "tags": [
              "Sessions"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "id",
                "in": "path",
                "description": "The unique identifier of the patient.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c5c864a73c8c2f1cbad794"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Sessions retrieved successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "date": {
                            "type": "string",
                            "format": "date-time",
                            "description": "The date of the session.",
                            "example": "2024-08-22T10:00:00.000Z"
                          },
                          "time": {
                            "type": "string",
                            "description": "The time of the session.",
                            "example": "10:00"
                          },
                          "type": {
                            "type": "string",
                            "description": "The type of session, such as consultation or check-up.",
                            "example": "Consultation"
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "The timestamp of when the session was created.",
                            "example": "2024-08-23T18:36:52.128Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "The timestamp of when the session was last updated.",
                            "example": "2024-08-23T18:36:52.135Z"
                          },
                          "notes": {
                            "type": "string",
                            "description": "Any notes from the session.",
                            "example": "Follow-up in one week to assess blood pressure and adjust treatment if necessary."
                          },
                          "nextAppointment": {
                            "type": "string",
                            "format": "date-time",
                            "description": "The date and time of the next scheduled appointment.",
                            "example": "2024-08-29T10:00:00.000Z"
                          },
                          "prescription": {
                            "type": "string",
                            "description": "Medication prescribed during the session.",
                            "example": "20mg Lisinopril daily"
                          },
                          "diagnosis": {
                            "type": "string",
                            "description": "The diagnosis made during the session.",
                            "example": "Hypertension"
                          },
                          "labTests": {
                            "type": "string",
                            "description": "Any laboratory tests ordered during the session.",
                            "example": "Electrolyte panel, Renal function tests"
                          },
                          "radOrders": {
                            "type": "string",
                            "description": "Any radiology orders made during the session.",
                            "example": "Echocardiogram"
                          }
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden - Insufficient permissions to access this endpoint",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only patient can access this route. Please login as patient."
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Patient not found or invalid ID",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Patient not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error - Error during processing",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal Server Error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/patients/{id}/sessions/{sessionId}": {
          "get": {
            "summary": "Retrieve a specific session of a patient - for patient.",
            "description": "Fetches details of a specific session associated with a patient. This endpoint requires authentication with a valid session token and must be performed by an authenticated patient.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `patient`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n- `id` (path, required): The unique identifier of the patient.\n- `sessionId` (path, required): The unique identifier of the session to retrieve.\n\n**Response:**\n- On success: Returns details of the session, including fields such as `_id`, `doctor`, `date`, `type`, and more.\n- On error: Provides details about validation issues, unauthorized access, or server errors.\n",
            "tags": [
              "Sessions"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "id",
                "in": "path",
                "description": "The unique identifier of the patient.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c5c864a73c8c2f1cbad794"
                }
              },
              {
                "name": "sessionId",
                "in": "path",
                "description": "The unique identifier of the session.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c6d13850a701dcd952a5d6"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Session retrieved successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string",
                          "description": "The unique identifier of the session.",
                          "example": "66c8d6c488b1dba4bf83ea04"
                        },
                        "doctor": {
                          "type": "object",
                          "description": "The details of the doctor who conducted the session.",
                          "properties": {
                            "_id": {
                              "type": "string",
                              "description": "The unique identifier of the doctor.",
                              "example": "66c8ccbf66990a1156a5a8fe"
                            },
                            "email": {
                              "type": "string",
                              "description": "The doctor's email.",
                              "example": "drjohnsmith@example.com"
                            },
                            "firstName": {
                              "type": "string",
                              "description": "The doctor's first name.",
                              "example": "John"
                            },
                            "lastName": {
                              "type": "string",
                              "description": "The doctor's last name.",
                              "example": "Smith"
                            },
                            "phone": {
                              "type": "string",
                              "description": "The doctor's contact phone number.",
                              "example": "9876543210"
                            },
                            "specialization": {
                              "type": "string",
                              "description": "The doctor's specialization.",
                              "example": "Cardiology"
                            },
                            "contact": {
                              "type": "object",
                              "description": "Any additional contact information for the doctor."
                            },
                            "createdAt": {
                              "type": "string",
                              "format": "date-time",
                              "description": "The timestamp when the doctor was created.",
                              "example": "2024-08-23T17:54:07.725Z"
                            },
                            "gender": {
                              "type": "string",
                              "description": "The doctor's gender.",
                              "example": "M"
                            },
                            "bio": {
                              "type": "string",
                              "description": "The doctor's biography or background.",
                              "example": "Experienced cardiologist with over 15 years of practice."
                            }
                          }
                        },
                        "date": {
                          "type": "string",
                          "format": "date-time",
                          "description": "The date of the session.",
                          "example": "2024-08-22T10:00:00.000Z"
                        },
                        "time": {
                          "type": "string",
                          "description": "The time of the session.",
                          "example": "10:00"
                        },
                        "type": {
                          "type": "string",
                          "description": "The type of session (e.g., consultation, follow-up).",
                          "example": "Consultation"
                        },
                        "createdAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "The timestamp when the session was created.",
                          "example": "2024-08-23T18:36:52.128Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "The timestamp when the session was last updated.",
                          "example": "2024-08-23T18:36:52.135Z"
                        },
                        "notes": {
                          "type": "string",
                          "description": "Session notes.",
                          "example": "Follow-up in one week to assess blood pressure and adjust treatment if necessary."
                        },
                        "nextAppointment": {
                          "type": "string",
                          "format": "date-time",
                          "description": "The date and time of the next appointment.",
                          "example": "2024-08-29T10:00:00.000Z"
                        },
                        "prescription": {
                          "type": "string",
                          "description": "The prescription given during the session.",
                          "example": "20mg Lisinopril daily"
                        },
                        "diagnosis": {
                          "type": "string",
                          "description": "The diagnosis provided during the session.",
                          "example": "Hypertension"
                        },
                        "labTests": {
                          "type": "string",
                          "description": "Any lab tests ordered during the session.",
                          "example": "Electrolyte panel, Renal function tests"
                        },
                        "radOrders": {
                          "type": "string",
                          "description": "Any radiology orders given during the session.",
                          "example": "Echocardiogram"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden - Insufficient permissions to access this endpoint",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only patient can access this route. Please login as patient."
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Patient or session not found",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Session not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error - Error during processing",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal Server Error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/patients/{id}/doctor/": {
          "get": {
            "summary": "Retrieve a data about the patient's doctor - for patient.",
            "description": "Fetches details of a the doctor associated with a patient. This endpoint requires authentication with a valid session token and must be performed by an authenticated patient.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `patient`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token used for authorization.\n- `id` (path, required): The unique identifier of the patient.\n\n**Response:**\n- On success: Returns data about the patient's doctor, including fields such as `_id`, `firsName`, `LastName`, `email`, `phone`, and more.\n- On error: Provides details about validation issues, unauthorized access, or server errors.\n",
            "tags": [
              "Doctors"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "id",
                "in": "path",
                "description": "The unique identifier of the patient.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "66c5c864a73c8c2f1cbad794"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Doctor details retrieved successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string",
                          "description": "The unique identifier of the doctor.",
                          "example": "66c5c864a73c8c2f1cbad794"
                        },
                        "email": {
                          "type": "string",
                          "description": "The doctor's email address.",
                          "example": "johndoe@example.com"
                        },
                        "firstName": {
                          "type": "string",
                          "description": "The doctor's first name.",
                          "example": "Jenna"
                        },
                        "lastName": {
                          "type": "string",
                          "description": "The doctor's last name.",
                          "example": "Dean"
                        },
                        "phone": {
                          "type": "string",
                          "description": "The doctor's phone number.",
                          "example": "1234567899"
                        },
                        "specialization": {
                          "type": "string",
                          "description": "The doctor's area of specialization.",
                          "example": "Dermatology"
                        },
                        "contact": {
                          "type": "object",
                          "description": "The doctor's contact details.",
                          "properties": {
                            "address": {
                              "type": "string",
                              "description": "The doctor's address.",
                              "example": "1234 sunset blvd"
                            },
                            "city": {
                              "type": "string",
                              "description": "The city where the doctor is located.",
                              "example": "Los Angeles"
                            },
                            "state": {
                              "type": "string",
                              "description": "The state where the doctor is located.",
                              "example": "CA"
                            }
                          }
                        },
                        "createdAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "The timestamp when the doctor's profile was created.",
                          "example": "2024-08-21T10:58:44.532Z"
                        },
                        "gender": {
                          "type": "string",
                          "description": "The doctor's gender.",
                          "example": "F"
                        },
                        "bio": {
                          "type": "string",
                          "description": "A brief biography of the doctor.",
                          "example": "Experienced dermatologist with over 15 years of practice."
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden - Insufficient permissions to access this endpoint",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only patient can access this route. Please login as patient."
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Patient or doctor not found",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Patient not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error - Error during processing",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal Server Error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/sessions": {
          "post": {
            "summary": "Adds a new session for a doctor and patient - for doctor.",
            "description": "Creates a new session for the given doctor and patient. This endpoint requires authentication with a valid session token and must be performed by an authenticated doctor.\n\n**Authentication:**\n- Token-based authentication is required, where the `X-Token` header must contain a valid session token.\n- Requires a role of `doctor`.\n\n**Request Body:**\n- Required fields: `doctorId`, `patientId`.\n- Optional fields: `type`, `date`, `time`, `nextAppointment`, `notes`, `privateNotes`, `prescription`, `diagnosis`, `labTests`, `radOrders`.\n\n**Response:**\n- On success: Returns the details of the newly created session, including fields such as `_id`, `doctor`, `patient`, `type`, `date`, `time`, and more.\n- On error: Provides details about validation issues, unauthorized access, or server errors.\n",
            "tags": [
              "Sessions"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              }
            ],
            "requestBody": {
              "required": true,
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "doctorId": {
                        "type": "string",
                        "description": "The ID of the doctor creating the session.",
                        "example": "66c5c864a73c8c2f1cbad794"
                      },
                      "patientId": {
                        "type": "string",
                        "description": "The ID of the patient for the session.",
                        "example": "66c6d13850a701dcd952a5d6"
                      },
                      "type": {
                        "type": "string",
                        "enum": [
                          "Consultation",
                          "Follow up",
                          "Routine"
                        ],
                        "description": "The type of session. Defaults to \"Consultation\".",
                        "example": "Consultation"
                      },
                      "date": {
                        "type": "string",
                        "format": "date-time",
                        "description": "The date of the session. Defaults to the current date.",
                        "example": "2024-08-22T10:00:00Z"
                      },
                      "time": {
                        "type": "string",
                        "description": "The time of the session. Defaults to the current time.",
                        "example": "10:00"
                      },
                      "nextAppointment": {
                        "type": "string",
                        "format": "date-time",
                        "description": "The next appointment date for the patient.",
                        "example": "2024-08-29T10:00:00Z"
                      },
                      "notes": {
                        "type": "string",
                        "description": "General notes visible to the doctor and patient.",
                        "example": "Follow-up in one week to assess blood pressure and adjust treatment if necessary."
                      },
                      "privateNotes": {
                        "type": "string",
                        "description": "Private notes visible only to the doctor.",
                        "example": "Monitor blood pressure closely and assess for potential side effects of Lisinopril. Consider adding additional tests if blood pressure remains uncontrolled or if new symptoms arise."
                      },
                      "prescription": {
                        "type": "string",
                        "description": "Any prescription given during the session.",
                        "example": "20mg Lisinopril daily"
                      },
                      "diagnosis": {
                        "type": "string",
                        "description": "The diagnosis made during the session.",
                        "example": "Hypertension"
                      },
                      "labTests": {
                        "type": "string",
                        "description": "Any lab tests ordered during the session.",
                        "example": "Electrolyte panel, Renal function tests"
                      },
                      "radOrders": {
                        "type": "string",
                        "description": "Any radiology orders made during the session.",
                        "example": "Echocardiogram"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Session created successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string",
                          "example": "66c6d13b50a701dcd952a5e0"
                        },
                        "doctor": {
                          "type": "string",
                          "example": "66c5c864a73c8c2f1cbad794"
                        },
                        "patient": {
                          "type": "string",
                          "example": "66c6d13850a701dcd952a5d6"
                        },
                        "type": {
                          "type": "string",
                          "example": "Consultation"
                        },
                        "date": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T10:00:00Z"
                        },
                        "time": {
                          "type": "string",
                          "example": "10:00"
                        },
                        "nextAppointment": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-29T10:00:00Z"
                        },
                        "notes": {
                          "type": "string",
                          "example": "Follow-up in one week to assess blood pressure and adjust treatment if necessary."
                        },
                        "privateNotes": {
                          "type": "string",
                          "example": "Monitor blood pressure closely and assess for potential side effects of Lisinopril. Consider adding additional tests if blood pressure remains uncontrolled or if new symptoms arise."
                        },
                        "prescription": {
                          "type": "string",
                          "example": "20mg Lisinopril daily"
                        },
                        "diagnosis": {
                          "type": "string",
                          "example": "Hypertension"
                        },
                        "labTests": {
                          "type": "string",
                          "example": "Electrolyte panel, Renal function tests"
                        },
                        "radOrders": {
                          "type": "string",
                          "example": "Echocardiogram"
                        },
                        "createdAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T05:41:35.066Z"
                        },
                        "updatedAt": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2024-08-22T05:41:35.201Z"
                        },
                        "age": {
                          "type": "integer",
                          "example": 34
                        },
                        "__v": {
                          "type": "integer",
                          "example": 0
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Validation error or missing required fields.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Bad Request: Missing required fields"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden - Insufficient permissions to access this endpoint.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only doctor can access this route. Please login as doctor."
                        }
                      }
                    }
                  }
                }
              },
              "404": {
                "description": "Not Found - Resource not found.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Doctor or patient not found"
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal server error.",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal server error"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "get": {
            "summary": "Retrieve a list of all sessions - for dev.",
            "description": "**Note:** This endpoint is intended for development and testing purposes only. It should not be used in production environments with real patient data.\nRetrieves a list of all sessions with optional pagination. This endpoint is restricted to users with the 'dev' role and requires authentication using a valid token in the `x-token` header.\n\n**Authentication:**\n- Bearer Token via `x-token` header.\n- Requires a role of `dev`.\n\n**Request Parameters:**\n- `x-token` (header, required): The authentication token.\n- `page` (header, optional): The page number for pagination.\n- `limit` (header, optional): Optional. The number of records per page.\n\n**Response:**\n- A list of sessions objects, each containing details such as `_id`, `firstName`, `lastName`, `email`, `doctor`, `medicalHistory`, and more.\n",
            "tags": [
              "Sessions"
            ],
            "security": [
              {
                "bearerAuth": []
              }
            ],
            "parameters": [
              {
                "name": "x-token",
                "in": "header",
                "description": "Token used for authentication.",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "b14c9f0e-2a15-40f6-8187-f4c5ad4638c5"
                }
              },
              {
                "name": "page",
                "in": "query",
                "description": "The page number to retrieve (for pagination).",
                "required": false,
                "schema": {
                  "type": "integer",
                  "example": 1
                }
              },
              {
                "name": "limit",
                "in": "query",
                "description": "The number of records to retrieve per page (for pagination).",
                "required": false,
                "schema": {
                  "type": "integer",
                  "example": 10
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Appointment details retrieved successfully",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string",
                            "example": "66c715074cade6c9c617bc87"
                          },
                          "doctor": {
                            "type": "string",
                            "example": "66c5c864a73c8c2f1cbad794"
                          },
                          "patient": {
                            "type": "string",
                            "example": "66c6d13850a701dcd952a5d6"
                          },
                          "type": {
                            "type": "string",
                            "example": "Consultation"
                          },
                          "date": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-22T10:00:00.000Z"
                          },
                          "time": {
                            "type": "string",
                            "example": "10:00"
                          },
                          "nextAppointment": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-29T10:00:00.000Z"
                          },
                          "notes": {
                            "type": "string",
                            "example": "Follow-up in one week to assess blood pressure and adjust treatment if necessary."
                          },
                          "privateNotes": {
                            "type": "string",
                            "example": "Monitor blood pressure closely and assess for potential side effects of Lisinopril. Consider adding additional tests if blood pressure remains uncontrolled or if new symptoms arise."
                          },
                          "prescription": {
                            "type": "string",
                            "example": "20mg Lisinopril daily"
                          },
                          "diagnosis": {
                            "type": "string",
                            "example": "Hypertension"
                          },
                          "labTests": {
                            "type": "string",
                            "example": "Electrolyte panel, Renal function tests"
                          },
                          "radOrders": {
                            "type": "string",
                            "example": "Echocardiogram"
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-22T10:37:59.808Z"
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2024-08-22T10:37:59.809Z"
                          },
                          "__v": {
                            "type": "integer",
                            "example": 0
                          }
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized - Invalid or expired token",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Unauthorized: Invalid or expired token"
                        }
                      }
                    }
                  }
                }
              },
              "403": {
                "description": "Forbidden - Access restricted to 'dev' role",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Forbidden: Only users with 'dev' role can access this route."
                        }
                      }
                    }
                  }
                }
              },
              "500": {
                "description": "Internal Server Error",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "error": {
                          "type": "string",
                          "example": "Internal server error"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "customOptions": {}
  };
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if (!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
