import { betterAuth } from 'better-auth';
import { Pool } from '@neondatabase/serverless';
import { emailOTP } from 'better-auth/plugins';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: {
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
    prefix: "ba",
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
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
