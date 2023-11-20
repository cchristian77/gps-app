## GPS Backend Application

### Getting Started

GPS backend application provide server-side API service that will be consumed by the frontend application.

By default, the service will map on port 9000, please make sure your port is not occupied by another
service before running the application. You can modify based on your preference and machine's configuration.

### Prerequisites 
Required tools and technology to run the application : 
1. **Node.js** version 18 or later (Javascript runtime engine)
2. **Docker** (containerization software )
3. **PostgresSQL** 14.7 or later (optional, if you don't use Docker as the database)

### Installation

1. Copy and rename env.example env file to .env, then adjust env file based on your local machine's configuration.

2. Install dependencies
   ```bash
   npm install

3. Run docker compose (for the database layer using Docker):
   ```bash
   docker compose -f docker-compose.dev.yml --env-file .env up -d

4. Run migration
   ```bash
   npx prisma migrate dev

5. Run seeder
    ```bash
    npx prisma db seed

6. Run application
   ```bash
   npm run dev
