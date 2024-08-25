#!/bin/bash
# This script automates the setup process for the application
# It installs Redis and MongoDB, starts the necessary services, installs dependencies, creates a configuration file, and starts the application
# You may need to redo some of the steps manually if the script fails

# Define color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if a service is active
service_is_active() {
    service "$1" status | grep -q 'running'
}

# Update system
echo -e "${BLUE}Updating system...${NC}"
sudo apt update
echo -e "${GREEN}System updated successfully.${NC}"

# Install Redis
if ! command_exists redis-server; then
    echo -e "${BLUE}Installing Redis...${NC}"
    sudo apt install -y redis-server redis-tools
    echo -e "${GREEN}Redis and Redis tools installed successfully.${NC}"
else
    echo -e "${YELLOW}Redis is already installed.${NC}"
fi

# Install MongoDB
if ! command_exists mongod; then
    echo -e "${BLUE}Installing MongoDB...${NC}"
    sudo apt install -y mongodb
    echo -e "${GREEN}MongoDB installed successfully.${NC}"
else
    echo -e "${YELLOW}MongoDB is already installed.${NC}"
fi

# Start necessary services
echo -e "${BLUE}Starting necessary services...${NC}"

# Start Redis server
echo -e "${BLUE}Starting Redis server...${NC}"
sudo service redis-server start

if service_is_active redis-server; then
    echo -e "${GREEN}Redis server is active.${NC}"
else
    echo -e "${RED}Redis server failed to start.${NC}"
fi

# Start MongoDB
if command_exists mongod; then
    echo -e "${BLUE}Starting MongoDB...${NC}"
    sudo service mongodb start

    if service_is_active mongodb; then
        echo -e "${GREEN}MongoDB is active.${NC}"
    else
        echo -e "${RED}MongoDB failed to start.${NC}"
    fi
else
    echo -e "${YELLOW}MongoDB is not installed. Skipping MongoDB startup.${NC}"
fi

# Navigate to the project directory
cd "$(dirname "$0")" || { echo -e "${RED}Failed to navigate to the project directory.${NC}"; exit 1; }

# Install dependencies
echo -e "${BLUE}Installing project dependencies...${NC}"
npm install
echo -e "${GREEN}Project dependencies installed.${NC}"

# Configuration
echo -e "${BLUE}Creating configuration file (.env)...${NC}"

read -p "Paste your MongoDB URI: " MONGO_URI
read -p "Enter your dev email: " EMAIL
read -sp "Enter your dev password: " PASSWORD
echo

# Create .env file
cat > .env <<EOF
MONGO_URI=$MONGO_URI
EMAIL=$EMAIL
PASSWORD=$PASSWORD
EOF

echo -e "${GREEN}.env file created.${NC}"

# Usage instructions
echo -e "${BLUE}Starting Redis server...${NC}"
redis-server &

echo -e "${BLUE}Starting Express application...${NC}"
npm run start &

echo -e "${BLUE}Creating a dev account...${NC}"
npm run dev createDev.js

# Check if dev account creation was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Dev account creation successful.${NC}"
    echo -e "${GREEN}Dev email: $EMAIL${NC}"
else
    echo -e "${RED}Dev account creation failed.${NC}"
fi

echo -e "${GREEN}Setup complete. Your application is running.${NC}"
