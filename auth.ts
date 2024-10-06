import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import Twitter from "next-auth/providers/twitter";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Twitter, Discord],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }: any) {
			session.user.id = token.id;
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});
