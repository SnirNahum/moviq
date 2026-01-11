## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the backend folder

```bash
cd backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment variables

Create a `.env` file inside the `backend` directory and add the required credentials.

Example:

```env
DATABASE_URL=postgres://user:password@localhost:5432/database_name
PORT=5000
```

### 5. Generate Drizzle migrations

```bash
npx drizzle-kit generate
```

### 6. Run database migrations

```bash
npx drizzle-kit migrate
```

### 7. Start the development server

```bash
npm run dev
```

### 8. Enter Swagger for API documentation

http://localhost:5000/docs/#/

## Notes

- Ensure PostgreSQL is running before running migrations.
- The server will start in development mode.
- Database schema is managed using **Drizzle ORM**.

---

## Scripts

| Command                    | Description              |
| -------------------------- | ------------------------ |
| `npm run dev`              | Start development server |
| `npx drizzle-kit generate` | Generate DB migrations   |
| `npx drizzle-kit migrate`  | Apply DB migrations      |

---

## Project Structure (Backend)

```bash
backend/
├── src/
│   ├── modules/
│   ├── errors/
│   ├── db/
│   └── server.ts
├── migrations/
├── .env
└── package.json
```
