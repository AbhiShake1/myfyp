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
  mysqlEnum,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";
import { fypTable, mysqlTable } from "./helpers/fyp-table";

export { fypTable, mysqlTable } from "./helpers/fyp-table";

const roles = mysqlEnum("roles", ["admin", "staff", "student"]).default("student");

export const users = fypTable("user", {
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
  role: roles,
});

export const studentSubscriptions = fypTable('studentSubscriptions', {
  userId: varchar('user_id', { length: 255 }),
  startDate: date('start_date'),
  endDate: date('end_date'),
  subscriptionStatus: varchar('subscription_status', { length: 255 }),
});

export const assignments = fypTable('assignments', {
  userId: varchar('user_id', { length: 255 }),
  file_path: varchar('file_path', { length: 255 }),
});

export const chats = fypTable('chats', {
  senderId: varchar('sender_id', { length: 255 }),
  receiverId: varchar('receiver_id', { length: 255 }),
  message: text('message'),
  timestamp: timestamp('timestamp'),
});

export const files = fypTable('files', {
  chatId: varchar('chat_id', { length: 255 }),
  fileUrl: varchar('file_url', { length: 255 }),
  fileType: varchar('file_type', { length: 255 }),
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
  // staffs: many(users),
  // students: many(users),
  // chats: many(chats),
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const studentSubscriptionsRelations = relations(studentSubscriptions, ({ one }) => ({
  student: one(users, {
    fields: [studentSubscriptions.userId],
    references: [users.id]
  }),
}));

export const assignmentsRelations = relations(assignments, ({ one }) => ({
  staff: one(users, {
    fields: [assignments.userId],
    references: [users.id]
  }),
  student: one(users, {
    fields: [assignments.userId],
    references: [users.id]
  }),
}));

export const chatsRelations = relations(chats, ({ many, one }) => ({
  sender: one(users, {
    fields: [chats.senderId],
    references: [users.id]
  }),
  receiver: one(users, {
    fields: [chats.receiverId],
    references: [users.id]
  }),
  files: many(files),
}));

export const filesRelations = relations(files, ({ one }) => ({
  chat: one(chats, {
    fields: [files.chatId],
    references: [chats.id]
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));
