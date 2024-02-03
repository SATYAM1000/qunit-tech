import { connectToDatabase } from "@/config/dbConfig";
import User from "@/models/userModels";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs'
import { generateToken } from "@/helpers/jwtTokenGenerator";
export const authoption: NextAuthOptions = {
    pages: {
        signIn: '/login',
        error: '/not-found'
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                connectToDatabase();
                console.log("from signin", account)
                const checkUser = await User.findOne({ email: user.email });
                if (checkUser) {
                    return checkUser;
                }
                const createdUser = await User.create({
                    name: user.name,
                    email: user.email,
                    role: "user",
                    category: "Student",
                });
                return createdUser;
            } catch (error) {
                console.log("Signin Error", error);
                return false;
            }
        },
        async jwt({ token, user, session, account }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            console.log("from jwt", token, user, session, account)
            if (account && account?.provider == 'google') {
                const getUser = await User.findOne({ email: user.email });
                const jwt_token = await generateToken(getUser);
                return {
                    ...token,
                    jwt_token,
                    id: getUser._id
                }
            }
            if (user) {
                return {
                    ...token,
                    id: user.id,
                }
            }
            return token
        },
        async session({ token, user, session }) {
            console.log("from session", token, user, session)
            return {
                ...session, user: {
                    ...session.user,
                    id: token.id || token._id,
                    jwt_token: token.jwt_token
                }
            }
        },
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "enter an email" },
                password: { label: "Password", type: "password", placeholder: "enter password" }
            },
            async authorize(credentials, req) {
                connectToDatabase();
                const user = await User.findOne({ email: credentials?.email });
                console.log(user)
                if (user && credentials) {
                    const IspasswordCorrect = await bcrypt.compare(credentials?.password, user.password);

                    if (!IspasswordCorrect) return null;
                    return user;
                } else {
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

        })
    ],
    secret: process.env.NEXT_SECRET,
    session: {
        strategy: "jwt",
    },
}


const handler = NextAuth(authoption);

export { handler as GET, handler as POST };
