import { Pool } from 'pg';
import { betterAuth } from 'better-auth';
import { emailOTP } from 'better-auth/plugins';
import { Resend } from 'resend';

const isLocal = process.env.NODE_ENV === 'development';

const DATABASE_URL = process.env.DATABASE_URL;
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET;
const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'FlowCFO <hello@flowcfo.net>';

let auth: any = null;
let initError: Error | null = null;

try {
  if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");
  if (!BETTER_AUTH_SECRET) throw new Error("BETTER_AUTH_SECRET is not set");
  if (!BETTER_AUTH_URL) throw new Error("BETTER_AUTH_URL is not set");

  const pool = new Pool({
    connectionString: DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

  const db = {
    query: async (text: string, params?: any[]) => {
      const result = await pool.query(text, params);
      return result;
    },
    connect: () => pool.connect(),
  };

  auth = betterAuth({
    database: db,
    user: { modelName: 'ba_user' as const },
    session: { modelName: 'ba_session' as const },
    account: { modelName: 'ba_account' as const },
    verification: { modelName: 'ba_verification' as const },
    emailAndPassword: {
      enabled: true,
    },
    emailVerification: {
      autoSignInAfterVerification: true,
    },
    plugins: [
      emailOTP({
        sendVerificationOnSignUp: true,
        async sendVerificationOTP({ email, otp, type }) {
          if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
          const resend = new Resend(RESEND_API_KEY);
          await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject:
              type === 'sign-in'
                ? 'Your FlowCFO Sign-in Code'
                : 'Verify your FlowCFO Email',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #1a202c; text-align: center;">FlowCFO</h2>
                <p style="font-size: 16px; color: #4a5568;">Your verification code is:</p>
                <div style="background-color: #f7fafc; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                  <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #2d3748;">${otp}</span>
                </div>
                <p style="font-size: 14px; color: #718096; text-align: center;">This code will expire in 10 minutes.</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                <p style="font-size: 12px; color: #a0aec0; text-align: center;">If you didn't request this, you can safely ignore this email.</p>
              </div>
            `,
          });
        },
      }),
    ],
    secret: BETTER_AUTH_SECRET,
    baseURL: BETTER_AUTH_URL,
  });
} catch (e) {
  initError = e instanceof Error ? e : new Error(String(e));
}

if (isLocal && auth) {
  auth.$context.then((ctx: any) => ctx.runMigrations().catch(() => {}));
}

export { auth, initError };
