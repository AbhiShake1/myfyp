import { type BuildColumns, sql } from "drizzle-orm";
import { type MySqlColumnBuilderBase, mysqlTableCreator, type MySqlTableExtraConfig, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `merofyp_${name}`);

const extraColumns = {
  id: varchar("id", { length: 191 })
    .primaryKey()
    // the anon function cannot be replaced by a tear-off
    // like $defaultFn(crypto.randomUUID) due to hoisting
    // it uses a function so it will expect `this` to be type crypto
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
}

export type ExtraColumns = typeof extraColumns;

export function fypTable<
  TTableName extends string,
  TColumnsMap extends Record<string, MySqlColumnBuilderBase>,
>(
  tableName: TTableName,
  columns: TColumnsMap,
  extraConfig?: (
    self: BuildColumns<TTableName, TColumnsMap, 'mysql'>
      & BuildColumns<TTableName, ExtraColumns, 'mysql'>,
  ) => MySqlTableExtraConfig,
) {
  return mysqlTable(
    tableName,
    {
      ...extraColumns,
      ...columns,
    },
    !extraConfig ? undefined : c => extraConfig({ ...extraColumns, ...c }),
  );
}
