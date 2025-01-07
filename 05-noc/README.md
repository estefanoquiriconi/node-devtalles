# NOC Project

## Description

The NOC Project is an application built using Node.js and TypeScript, following the principles of Clean Architecture. This approach allows for a clear separation of responsibilities, facilitating code maintenance and scalability. The application utilizes multiple repositories to manage data persistence, including MongoDB and PostgreSQL.

## Requirements

- Node.js (version 14 or higher)
- Docker and Docker Compose

## Environment Variable Configuration

To ensure the application functions correctly, it is necessary to configure environment variables. Three configuration files are provided:

1. **`.env`**: This file contains environment variables for the production environment.
2. **`.env.test`**: This file contains environment variables for the testing environment.
3. **`.env.template`**: This file serves as a template for creating the `.env` file. You can copy it and rename it to `.env`, then adjust the variables according to your needs.

## Docker Configuration

The project includes Docker configurations to facilitate the execution of the application and tests. Two Docker Compose configuration files are provided:

1. **`docker-compose.yml`**: This file is used to spin up the application services, including MongoDB and PostgreSQL.
2. **`docker-compose.test.yml`**: This file is used to spin up testing services, utilizing separate databases to avoid interference with production data.

## Running the Application

To run the application, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <REPOSITORY_URL>
   cd 05-noc
   ```

2. **Copy the environment variable template file**:

   ```bash
   cp .env.template .env
   ```

3. **Adjust the environment variables in the `.env` file** according to your needs.

4. **Install the dependencies**:

   ```bash
   npm install
   ```

5. **Start the Docker services**:

   ```bash
   docker-compose up -d
   ```

6. **Run the application in development mode**:

   ```bash
   npm run dev
   ```

   - This command uses `tsnd` (TypeScript Node Dev) to automatically restart the application when changes in the code are detected.

## Running Tests

To run the tests, ensure that the testing services are up:

1. **Start the testing services**:

   ```bash
   npm run docker:test
   ```

2. **Run the tests**:

   ```bash
   npm run test
   ```

   - This command executes the tests using Jest. You can also use the following variants:
     - To run tests in watch mode:
       ```bash
       npm run test:watch
       ```
     - To run tests and generate a coverage report:
       ```bash
       npm run test:coverage
       ```
