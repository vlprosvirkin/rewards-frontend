import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import Twitter from "next-auth/providers/twitter";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Twitter, Discord],
	callbacks: {
		async jwt({ token, user }) {
			if (!token.sub) return token;
			
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }: any) {
			if (token.sub && session.user) {
        session.user.id = token.sub;
      }
			return session;
		},
	},
	secret: process.env.AUTH_SECRET,
});
