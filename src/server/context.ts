import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';

// Contexto para tRPC
export async function createContext({ req, res }: CreateNextContextOptions) {
  return { req, res };
}

export type Context = inferAsyncReturnType<typeof createContext>;