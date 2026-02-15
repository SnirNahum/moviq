import { Client } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("Missing DATABASE_URL in environment (.env).");
  process.exit(1);
}

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function main(): Promise<void> {
  const maxAttempts = Number(process.env.DB_WAIT_ATTEMPTS ?? 30);
  const delayMs = Number(process.env.DB_WAIT_DELAY_MS ?? 1000);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const client = new Client({ connectionString: DATABASE_URL });

    try {
      await client.connect();
      await client.query("SELECT 1;");
      await client.end();
      process.exit(0);
    } catch (err) {
      try {
        await client.end();
      } catch {
        // ignore
      }

      if (attempt === maxAttempts) {
        const message =
          err instanceof Error ? err.message : String(err);

        console.error(
          `Postgres not ready after ${maxAttempts} attempts. Last error: ${message}`
        );
        process.exit(1);
      }

      await sleep(delayMs);
    }
  }
}

void main();
