# DoctorFlow API

DoctorFlow is an API designed to streamline the patient management process. It digitizes patient records and enhances communication between doctors and patients.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack Used](#tech-stack-used)
- [Installation, Setup, and Usage](#installation-setup-and-usage)
- [Testing](#testing)
- [Contributors](#contributors)
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

### Special User: Dev

- The "Dev" user cannot be created via the API. A special script `createDev.js` is used to create this user locally. This script requires two environment variables: `EMAIL` and `PASSWORD`.

## Target Audience

The API is intended for other developers who want to integrate DoctorFlow into their websites or applications.

## Tech Stack Used

- **Backend Framework**: Express.js and Node.js for server-side logic and routing.
- **Database**: MongoDB with Mongoose for data management and schema modeling.
- **Authentication**: UUID4 tokens for user authentication, managed with Redis for efficient session handling.
- **Documentation**: JSDoc and Swagger for generating and interacting with API documentation.
- **Testing**: Postman for API testing and validation.
- **Redis**: Used for managing authentication tokens and improving session management.

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
### System Setup
1. Update System and Install Dependencies:
```bash
    sudo apt update
    sudo apt install redis-server redis-tools
    sudo apt install mongodb
```
2. Start Necessary Services:
    - Start Redis Server:
```bash
    sudo service redis-server start
```
   - Start MongoDB (if you are working on a local machine):
```bash
    sudo service mongod start
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

Note: You can use .env file to store environment variables or you can set them directly in the terminal using export command.

```bash
export MONGO_URI=your-mongodb-uri
export EMAIL=your-dev-email
export PASSWORD=your-dev-password
```

- **`MONGO_URL`**: Replace your-mongodb-uri with the URI of your MongoDB instance. If you're using *MongoDB Atlas*, ensure your IP address is added to the database's access white list. Refer to Atlas documentation for more details.
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

Note: Dev account can only access 3 endpoints: `/doctors`, `/patients`, and `/sessions`.

4. **Access the API Documentation**:
   - **Deployed Documentation**: Visit the deployed API documentation at [/api-docs](https://drihmia.tech/api-docs/).
   - **Local Documentation**: Access the Swagger UI locally at [/api-docs](http://localhost:3000/api-docs) to explore and interact with the API endpoints.

## Testing

The API can be tested using Postman. The collection and environment files are available in the `postman` directory. Click the button below to run the collection in Postman:

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/35187959-d1928064-6cee-41a8-9a97-ea4fa783494d?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D35187959-d1928064-6cee-41a8-9a97-ea4fa783494d%26entityType%3Dcollection%26workspaceId%3D8de31a35-037f-493e-bb07-2890eda04b51)

Note: Basic environment variables are set in the Postman collection. Update the environment variables with your own values if necessary.

### Environment Variables

- **BaseUrlDF**: The base URL of the DoctorFlow API, e.g., `https://drihmia.tech`
- **DevEmail**: The email address you've chosen to create the dev account using the script.
- **DevPassword**: The password you've chosen to create the dev account using the script.

## Contributors

- **Authors**:
  - **DRIHMIA Redouane**: [drihmia.redouane@gmail.com](mailto:drihmia.redouane@gmail.com)
  - **Omnia ABOUHAIKAL**: [omniaabohaekal@gmail.com](mailto:omniaabohaekal@gmail.com)

- **GitHub Accounts**:
  - [Drihmia](https://github.com/Drihmia)
  - [oniaz](https://github.com/oniaz)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

