import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { OAuth2Client } from "google-auth-library";

import { env } from "~/env";
import { db } from "~/server/db";
import { mysqlTable, users } from "~/server/db/schema";

const googleAuthClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: "student" | "admin" | "staff" | null
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const adapter = DrizzleAdapter(db, mysqlTable);

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter,
  providers: [
    CredentialsProvider({
      id: "googleonetap",
      name: "google-one-tap",
      credentials: {
        credential: { type: "text" }
      },
      async authorize(credentials) {
        const token = credentials?.credential;

        if (!token) {
          throw new Error("Cannot extract payload from signin token");
        }

        const ticket = await googleAuthClient.verifyIdToken({
          idToken: token,
          audience: env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) {
          throw new Error("Cannot extract payload from signin token");
        }

        const { email, sub, given_name, family_name, email_verified, picture: image } = payload;

        if (!email) {
          throw new Error("Email not available");
        }

        let user = await adapter.getUserByEmail?.call(undefined, email);

        // If no user is found, then we create one. 
        if (!user) {
          user = await adapter.createUser!({
            name: [given_name, family_name].join(" "),
            email,
            image,
            emailVerified: email_verified ? new Date() : null,
          });
        }

        // The user may already exist, but maybe it signed up with a different provider. With the next few lines of code 
        // we check if the user already had a Google account associated, and if not we create one.
        const account = await adapter.getUserByAccount?.call(undefined, { provider: "google", providerAccountId: sub });

        if (!account && user) {
          await adapter.linkAccount!({
            userId: user.id,
            provider: "google",
            providerAccountId: sub,
            type: "email",
          });
        }

        return user;
      },
      type: "credentials",
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  callbacks: {
    async jwt({ token, trigger }) {
      if (token.email) {
        if (!token.role) {
          const userFromDb = await db.query.users.findMany({ where: ({ email }, { eq }) => eq(email, token.email!) });
          if (userFromDb.length > 0) {
            token.role = userFromDb[0]?.role;
          }
        }
        if (trigger === "signUp" && token.email) {
          await db.insert(users).values({ email: token.email, name: token.name, image: token.picture });
        }
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    }
  },
  session: { strategy: "jwt" },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
