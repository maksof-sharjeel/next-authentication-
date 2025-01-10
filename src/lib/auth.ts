import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { hashPassword } from "./utils"
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./db";
import bcrypt from 'bcryptjs'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import jwt from 'jsonwebtoken'
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
      
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });
      
        if (!user) {
          throw new Error("Email not registered");
        }
      
        const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Incorrect password");
        }
      
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "shhhhh");
        
      const sessions =  await prisma.sessions.create({
          data: {
            token,
            userId: user.id,
          },
        });
      console.log(sessions,"sessions");
        return {
          id: user.id,
          email: user.email,
          name: user.userName,
        };
      }
      
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 10000
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-in',
  },
})