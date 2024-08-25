# DoctorFlow API

DoctorFlow is an API designed to streamline the patient management process. It digitizes patient records and enhances communication between doctors and patients.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack Used](#tech-stack-used)
- [Installation, Setup, and Usage](#installation-setup-and-usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

DoctorFlow is a clinic management system API built with Express.js and Node.js. It uses MongoDB for data storage and Redis for managing authentication tokens. The API provides a comprehensive solution for managing doctor and patient data, handling appointments, and improving clinic operations.

## Features

### For Doctors

- **Profile Management**: Create and manage personal profiles.
- **Patient Management**: Create and manage patient profiles, including general information and medical data.
- **Session Logging**: Log patient sessions with detailed information such as session date, diagnosis, prescriptions.

### For Patients

- **Profile Viewing**: View their personal profiles.
- **Session History**: Access their session history.
- **Doctor Information**: View basic information about their doctor.

## Target Audience

The API is intended for other developers who want to integrate DoctorFlow into their websites or applications.

## Tech Stack Used

- **Backend Framework**: Express.js and Node.js
- **Database**: MongoDB with Mongoose for data management
- **Authentication**: UUID4 tokens for user authentication, managed with Redis
- **Documentation**: JSDoc with auto-generated Swagger for API documentation
- **Testing**: Postman for API test creation and execution
- **Redis**: Used for managing authentication tokens
- **Swagger**: Provides auto-generated API documentation through JSDoc
- **Postman**: Used for API testing

## Installation, Setup, and Usage

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm**: Comes with Node.js. [Learn more about npm](https://www.npmjs.com/get-npm)
- **Redis**: [Download Redis](https://redis.io/download)

### Cloning the Repository

To get started with DoctorFlow, first clone the repository to your local machine:

```bash
git clone https://github.com/Drihmia/DoctorFlow.git
```

### Installation

Once you have cloned the repository, navigate to the project directory and install the required dependencies:

```bash
cd DoctorFlow
npm install
```

### Configuration

Create a `.env` file in the root directory of the project and include the following environment variables:

```env
MONGO_URI=your-mongodb-uri
EMAIL=your-dev-email@example.com
PASSWORD=your-dev-password
```

- **`MONGO_URI`**: Replace `your-mongodb-uri` with the URI of your MongoDB instance.
- **`EMAIL`** and **`PASSWORD`**: Use these for creating a dev account to access dev endpoints.

### Usage

1. **Start Redis Server**:
   - Ensure Redis is installed and running.
   - Start the Redis server with:
     ```bash
     redis-server
     ```

2. **Start the Express Application**:
   - Start the Node.js application:
     ```bash
     npm run start
     ```

3. **Create a Dev Account**:
   - Run the script to create a dev account, which will allow access to the dev endpoints:
     ```bash
     npm run dev createDev.js
     ```
   - This script uses the `EMAIL` and `PASSWORD` you set in your `.env` file to create the dev account..

4. **Access the API Documentation**:
   - **Deployed Documentation**: Visit the deployed API documentation at [Your Deployed API Docs](https://).
   - **Local Documentation**: Access the Swagger UI locally at [http://localhost:3000/api-docs](http://localhost:3000/api-docs) to explore and interact with the API endpoints.

## Testing

## Contributing

## License
