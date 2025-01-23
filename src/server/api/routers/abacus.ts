// src/server/routers/abacusClient.ts
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { env } from "~/env";

export const abacusClientRouter = createTRPCRouter({

  createDeploymentConversation: publicProcedure
    .input(z.object({
      name: z.string(),
    }))
    .mutation(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/createDeploymentConversation`, {
        method: "POST",
        headers: {
          "apiKey": `${env.ABACUS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deploymentId: env.ABACUS_DEPLOYMENT_ID,
          name: input.name,
          deploymentToken: env.ABACUS_DEPLOYMENT_TOKEN,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la conversación de despliegue");
      }

      return response.json();
    }),

  listDeploymentConversations: publicProcedure
    .query(async () => {
      const response = await fetch(
        `${env.ABACUS_API_URL}/listDeploymentConversations?deploymentId=${env.ABACUS_DEPLOYMENT_ID}`,
        {
          method: "GET",
          headers: {
            "apiKey": `${env.ABACUS_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al listar las conversaciones de despliegue");
      }

      return response.json();
    }),

  getChatResponse: publicProcedure
    .input(z.object({
      messages: z.array(z.object({
        is_user: z.boolean(),
        text: z.string()
      })),
      deploymentConversationId: z.string().optional(),
      llmName: z.string().optional(),
      temperature: z.number().optional(),
      systemMessage: z.string().optional()
    }))
    .mutation(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/getChatResponse`, {
        method: "POST",
        headers: {
          "apiKey": `${env.ABACUS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deploymentToken: env.ABACUS_DEPLOYMENT_TOKEN,
          deploymentId: env.ABACUS_DEPLOYMENT_ID,
          messages: input.messages,
          deploymentConversationId: input.deploymentConversationId,
          llmName: input.llmName,
          temperature: input.temperature,
          systemMessage: input.systemMessage
        }),
      });

      if (!response.ok) {
        throw new Error("Error al obtener la respuesta del chat");
      }

      return response.json();
    }),
});