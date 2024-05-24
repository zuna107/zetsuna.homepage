import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import dotenv from 'dotenv';

dotenv.config(); // Load .env sebelum melakukan hal lain

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    DISCORD_WEBHOOK_URL: z.string().url(),
  },
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  onValidationError: (errors) => {
    console.error("Environment validation errors:", errors);
    process.exit(1);
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
