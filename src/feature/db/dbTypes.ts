import { ExtractTablesWithRelations } from "drizzle-orm";
import { PgTransaction } from "drizzle-orm/pg-core";
import { PostgresJsDatabase, PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js";
import { Sql } from "postgres";
import * as schema from "@/db/schema";

export type DbConnection = PostgresJsDatabase<typeof schema> & {
  $client: Sql<{}>;
}

export type Tx = PgTransaction<PostgresJsQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>


export type Db = DbConnection | Tx;