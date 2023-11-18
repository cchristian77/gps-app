## GPS Backend Application

### Installation

1. Copy and rename env.example env file to .env, then adjust env file based on your local machine's configuration.

2. Install dependencies
   ```bash
   npm install

3. Run docker compose:
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