import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as dotenv from "dotenv";

// Load environment variables based on environment
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

async function main() {
  // Log the environment and database URL (hiding credentials)
  console.log(
    `Running migrations in ${process.env.NODE_ENV || "development"} environment`
  );

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  // Log sanitized connection info (removing password)
  const sanitizedUrl = databaseUrl.replace(/\/\/[^:]+:[^@]+@/, "//****:****@");
  console.log(`Connecting to database: ${sanitizedUrl}`);

  // Create the connection
  const sql = postgres(databaseUrl, { max: 1 });
  const db = drizzle(sql);

  try {
    // Run migrations
    console.log("Starting migration process...");
    await migrate(db, { migrationsFolder: "./src/db/migrations" });
    console.log("Migrations completed successfully ✅");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    // Always close the connection
    await sql.end();
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Unhandled error in migration script:", err);
  process.exit(1);
});
