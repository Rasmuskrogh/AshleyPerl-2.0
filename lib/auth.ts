import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import pool from "./database";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          // Hämta admin-användaren från databasen
          const result = await pool.query(
            "SELECT id, username, password, name FROM users WHERE username = $1",
            [credentials.username]
          );

          if (result.rows.length === 0) {
            return null;
          }

          const user = result.rows[0];

          // Jämför lösenordet med hash:en i databasen
          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            username: user.username,
            name: user.name,
            role: "admin", // Alla inloggade användare är admins
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin";
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = "admin";
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
