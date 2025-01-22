// src/server/api/routers/abacus.ts

import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

// Configuración de la API de Abacus
const ABACUS_API_KEY = process.env.ABACUS_API_KEY;
const ABACUS_API_URL = process.env.ABACUS_API_URL;

export const abacusRouter = createTRPCRouter({
  // Ejemplo de procedimiento público
  getAbacusData: publicProcedure
    .input(
      z.object({
        // Define aquí los parámetros que necesitas enviar a Abacus
        parametro1: z.string(),
        parametro2: z.number(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await fetch(`${ABACUS_API_URL}/endpoint`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${ABACUS_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error en la petición a Abacus');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`Error al consultar Abacus: ${error}`);
      }
    }),

  // Ejemplo de procedimiento protegido
  postAbacusData: protectedProcedure
    .input(
      z.object({
        // Define aquí los parámetros para POST
        data: z.object({
          campo1: z.string(),
          campo2: z.number(),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Aquí puedes acceder al usuario autenticado con ctx.session.user
      try {
        const response = await fetch(`${ABACUS_API_URL}/endpoint`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${ABACUS_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input.data),
        });

        if (!response.ok) {
          throw new Error('Error en la petición a Abacus');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`Error al enviar datos a Abacus: ${error}`);
      }
    }),
});