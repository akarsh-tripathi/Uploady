import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import bcrypt from "bcrypt";
import { callbackify } from "util";


export const AuthOptions:NextAuthOptions ={
    adapter:PrismaAdapter(db),
    secret:process.env.NEXTAUTH_SECRET,
    session:{
        strategy:"jwt",
    },
    pages:{
        signIn: "/",
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",

          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if (!credentials?.username || !credentials?.password) return null;
            console.log(credentials);
            const exsistingUser = await db.user.findUnique({
                where: { username: credentials.username },
            });
            if (!exsistingUser) return null;
            const passwordMatch = await bcrypt.compare(
                credentials.password, // Fix: Add nullish coalescing operator to ensure credentials.password is not undefined
                exsistingUser.password
            );

            if (!passwordMatch) return null;
            return {
                id:exsistingUser.id,
                username:exsistingUser.username,
                email:exsistingUser.email,
            }
            }
        }),
    ],
    callbacks:{
        async jwt({ token, user}) {
            if(user){
                return{
                    ...token,
                    username:user.username,
                }
            }
            return token
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user:{
                    ...session.user,
                    username:token.username,
                    id:token.id,
                    emailid:token.email,
                }
            }
        },
    }
        

}