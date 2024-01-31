import { AuthOptions, ISODateString, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "@/config/dbConfig";
import userModel from "@/models/userModels";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export type CustomSession = {
	user?: CustomUser;
	expires: ISODateString;
};

export type CustomUser = {
	id?: string | null;
	name?: string | null;
	email?: string | null;
	role?: string | null;
};

export const authOptions: AuthOptions = {
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			try {
				connectToDatabase();
				const checkUser = await userModel.findOne({ email: user.email });
				if (checkUser) {
					return true;
				}
				await userModel.create({
					name: user.name,
					email: user.email,
					role: "user",
				});
				return true;
			} catch (error) {
				console.log("Signin Error", error);
				return false;
			}
		},
		async jwt({ token, user }: { token: JWT; user: CustomUser }) {
			if (user) {
				user.role = user?.role == null ? "user" : user?.role;
				token.user = user;
			}
			return token;
		},
		async session({
			session,
			token,
			user,
		}: {
			session: CustomSession;
			token: JWT;
			user: User;
		}) {
			session.user = token.user as CustomUser;
			return session;
		},
	},
	providers: [
		Credentials({
			name: "Next Auth",
			type: "credentials",

			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "Enter your email",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Enter your password",
				},
			},
			async authorize(credentials, req) {
				connectToDatabase();
				const user = await userModel.findOne({ email: credentials?.email });
				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
};