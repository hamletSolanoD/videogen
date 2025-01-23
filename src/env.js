import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    AUTH_DISCORD_ID: z.string(),
    AUTH_DISCORD_SECRET: z.string(),
    ABACUS_API_KEY: z.string(),
    ABACUS_PROJECT_ID: z.string(),
    ABACUS_API_URL: z.string().url(),
    ABACUS_DEPLOYMENT_TOKEN: z.string().url(),
    ABACUS_DEPLOYMENT_ID: z.string().url(),

    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    ABACUS_API_KEY: process.env.ABACUS_API_KEY,
    ABACUS_API_URL: process.env.ABACUS_API_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    ABACUS_PROJECT_ID:process.env.ABACUS_PROJECT_ID,
    AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    ABACUS_DEPLOYMENT_TOKEN: process.env.ABACUS_DEPLOYMENT_TOKEN,
    ABACUS_DEPLOYMENT_ID: process.env.ABACUS_DEPLOYMENT_ID,

    AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
