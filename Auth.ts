// Auth.tsx


import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticate } from "./app/utils/action";

class AuthError extends Error {
  constructor(public type: string) {
    super(type);
    this.name = 'AuthError';
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Use your custom API to verify user credentials
        try {
          const user = await authenticate(credentials);
          if (user) {
            return user;
          }
          return null;
        } catch (error) {
          throw new AuthError('CredentialsSignin');
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',  // Custom sign-in page if needed
  }
} satisfies NextAuthOptions;
