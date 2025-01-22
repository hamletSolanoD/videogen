// src/utils/abacusClient.ts
import { env } from "~/env";

export const abacusClient = {
  async fetch(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${env.ABACUS_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${env.ABACUS_API_KEY}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error('Error en la petición a Abacus');
    }

    return response.json();
  }
};