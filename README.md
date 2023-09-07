Example of Backend With TypeScript, ExpressJS, and Prisma

## Step by step installation
1. Clone this repository
```bash
git clone https://github.com/PBL-Dukcapil-SKH-2023/company-profile-backend.git
```
2. Navigate to the repo directory
```bash
cd company-profile-backend
```
3. Install dependencies
```bash
npm i
```
4. Create .env file
```bash
touch .env
```
5. Configure .env
```env
# This was inserted by `prisma init`:

# Environment variables declared in this file are automatically made available to Prisma.

# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

  

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.

# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

  

DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/DATABASE"
```
6. Migrate prisma schema into DBMS
```bash
npm prisma migrate
```
7. Run the development server
```bash
npm run dev
```
