import NextAuth, { User, Account, Session, Profile } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthService } from "../../../libs/AuthService";
import { TokenInfo } from "../../../libs/dtos/TokenInfo";

export default NextAuth({
  callbacks: {
    async signIn({ }: { user: User, account: Account, profile: Profile }) {
      return true
    },
    // Here the param 'user' actually conntains the TokenInfo
    async jwt({ token, user }: { token: any | TokenInfo | JWT, user?: any | TokenInfo, account?: Account }) {
      Object.assign(token, user);

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.expTime) {
        return token;
      }

      // Access token has expired, try to update it
      const refreshedUser: TokenInfo = await refreshAccessToken(user.refreshToken);
      Object.assign(token, refreshedUser);
      return token
    },
    async session({ session, user }: { session: Session, user: User, token: JWT }) {
      if (user) {
        session.user = user;
      }
      return session;
    },
    /**
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      return url.startsWith(baseUrl)
        ? url
        : baseUrl
    }
  },
  debug: process.env.NODE_ENV !== 'production',
  events: {
    // signOut(jwt: {access_token: string;}) {
    //   const apiService = new AuthService(process.env.API_BASE_URL!);
    //   apiService
    //     .setToken(jwt.access_token)
    //     .logout()
    //     .catch((err) => {
    //       console.error(
    //         `signout api [${err?.status}] ${JSON.stringify(err?.data)}`
    //       );
    //     });
    //   return Promise.resolve();
    // },
  },
  pages: {
    signIn: '/auth/signin',  // Displays signin buttons
    signOut: '/auth/signout', // Displays form with sign out button
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // Used for check email page
    newUser: undefined // If set, new users will be directed here on first sign in
  },
  providers: [
    CredentialsProvider<any>({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Record<'username' | 'password' | 'callbackUrl', string>,
      ) {
        const { username, password, callbackUrl } = credentials;

        try {
          const apiService = new AuthService();
          const response = await apiService.login({ username, password });
          return response as any;
        } catch (error: any) {
          // eslint-disable-next-line no-throw-literal
          throw `/auth/signin?callbackUrl=${encodeURIComponent(
            callbackUrl
          )}&error=CredentialsSignin`;
        }
      },
    }),
  ],
})

async function refreshAccessToken(token: string) {
  console.log('refreshAccessToken');
  try {
    const apiService = new AuthService();
    const response: TokenInfo = await apiService.refresh(token);
    return response;
  } catch (error) {
    console.error(error);
    throw error
  }
}