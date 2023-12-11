// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  text,
  timestamp,
  varchar,
  date,
  bigint,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";
import { fypTable, mysqlTable } from "./helpers/fyp-table";

export { fypTable, mysqlTable } from "./helpers/fyp-table";

export const users = fypTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
  role: varchar("role", { length: 255 }).$type<"admin" | "staff" | "student">().default("student"),
});

export const staffs = fypTable('staffs', {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  user_id: varchar('user_id', { length: 255 }),
});

export const students = fypTable('students', {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  user_id: varchar('user_id', { length: 255 }),
  staff_id: varchar('staff_id', { length: 255 }),
});

export const studentSubscriptions = fypTable('studentSubscriptions', {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  student_id: varchar('student_id', { length: 255 }),
  start_date: date('start_date'),
  end_date: date('end_date'),
  subscription_status: varchar('subscription_status', { length: 255 }),
});

export const assignments = fypTable('assignments', {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  staff_id: varchar('staff_id', { length: 255 }),
  student_id: varchar('student_id', { length: 255 }),
  file_path: varchar('file_path', { length: 255 }),
});

export const chats = fypTable('chats', {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  sender_id: varchar('sender_id', { length: 255 }),
  receiver_id: varchar('receiver_id', { length: 255 }),
  message: text('message'),
  timestamp: timestamp('timestamp'),
});

export const files = fypTable('files', {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  chat_id: varchar('chat_id', { length: 255 }),
  file_url: varchar('file_url', { length: 255 }),
  file_type: varchar('file_type', { length: 255 }),
});

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  })
);

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  staffs: many(staffs),
  students: many(students),
  chats: many(chats),
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const staffsRelations = relations(staffs, ({ many, one }) => ({
  user: one(users, {
    fields: [staffs.user_id],
    references: [users.id]
  }),
  students: many(students),
  assignments: many(assignments),
}));

export const studentsRelations = relations(students, ({ many, one }) => ({
  user: one(users, {
    fields: [students.user_id],
    references: [users.id]
  }),
  staff: one(staffs, {
    fields: [students.staff_id],
    references: [staffs.id]
  }),
  subscriptions: many(studentSubscriptions),
  assignments: many(assignments),
  chats: many(chats),
}));

export const studentSubscriptionsRelations = relations(studentSubscriptions, ({ one }) => ({
  student: one(students, {
    fields: [studentSubscriptions.student_id],
    references: [students.id]
  }),
}));

export const assignmentsRelations = relations(assignments, ({ one }) => ({
  staff: one(staffs, {
    fields: [assignments.staff_id],
    references: [staffs.id]
  }),
  student: one(students, {
    fields: [assignments.student_id],
    references: [students.id]
  }),
}));

export const chatsRelations = relations(chats, ({ many, one }) => ({
  sender: one(users, {
    fields: [chats.sender_id],
    references: [users.id]
  }),
  receiver: one(users, {
    fields: [chats.receiver_id],
    references: [users.id]
  }),
  files: many(files),
}));

export const filesRelations = relations(files, ({ one }) => ({
  chat: one(chats, {
    fields: [files.chat_id],
    references: [chats.id]
  }),
}));


export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));
