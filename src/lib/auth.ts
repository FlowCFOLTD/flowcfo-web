import { betterAuth } from 'better-auth';
import { emailOTP } from 'better-auth/plugins';
import { Resend } from 'resend';

const isLocal = process.env.NODE_ENV === 'development';

let pool: any;
let initError: string | null = null;

function makeErrorPool(msg: string): any {
  const errText = `[auth] ${msg}`;
  console.error(errText);
  return {
    query: async () => { throw new Error(errText); },
    connect: async () => { throw new Error(errText); },
  };
}

if (isLocal) {
  try {
    const { Pool: PgPool } = await import('pg');
    pool = new PgPool({
      connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/placeholder',
    });
  } catch {
    try {
      const { neon } = await import('@neondatabase/serverless');
      const sql = neon(process.env.DATABASE_URL || 'postgres://localhost:5432/placeholder');
      const query = async (text: string, params?: any[]) => {
        const rows = await sql.query(text, params ?? []);
        return { rows: rows as any[] };
      };
      pool = { query, connect: async () => ({ query, release: () => {} }) };
    } catch (e) {
      initError = `local neon fallback failed: ${e instanceof Error ? e.message : e}`;
      pool = makeErrorPool(initError);
    }
  }
} else {
  try {
    console.log('[auth] prod: importing pg');
    const { Pool: PgPool } = await import('pg');
    console.log('[auth] prod: pg ok');

    console.log('[auth] prod: importing pg-cloudflare');
    const cfMod = await import('pg-cloudflare') as any;
    const CloudflareSocket = cfMod.CloudflareSocket;
    console.log('[auth] prod: CloudflareSocket =', typeof CloudflareSocket);

    pool = new (PgPool as any)({
      connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/placeholder',
      ...(typeof CloudflareSocket === 'function' ? { Connection: CloudflareSocket } : {}),
      ssl: { rejectUnauthorized: false },
    });
    console.log('[auth] prod: pool ok');
  } catch (err) {
    initError = `pg+pg-cloudflare: ${err instanceof Error ? `${err.message}\n${err.stack}` : err}`;
    console.error('[auth] prod:', initError);

    try {
      console.log('[auth] prod: trying neon fallback');
      const { neon } = await import('@neondatabase/serverless');
      const sql = neon(process.env.DATABASE_URL || 'postgres://localhost:5432/placeholder');
      const query = async (text: string, params?: any[]) => {
        const rows = await sql.query(text, params ?? []);
        return { rows: rows as any[] };
      };
      pool = { query, connect: async () => ({ query, release: () => {} }) };
      console.log('[auth] prod: neon fallback ok');
    } catch (e2) {
      initError += ` | neon fallback: ${e2 instanceof Error ? e2.message : e2}`;
      pool = makeErrorPool(initError);
    }
  }
}

export const auth = betterAuth({
  database: pool,
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
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: process.env.FROM_EMAIL || 'FlowCFO <hello@flowcfo.net>',
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
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});

// Auto-run migrations on first load (dev only — backend handles this in prod)
if (isLocal) {
  auth.$context.then(ctx => ctx.runMigrations().catch(() => {}));
}
