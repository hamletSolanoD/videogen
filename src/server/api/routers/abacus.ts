// src/server/routers/abacusClient.ts
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { env } from "~/env";

export const abacusClientRouter = createTRPCRouter({
  // Método para obtener los chats de un usuario por su ID
  getChatsByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/listChatSessions`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${env.ABACUS_API_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los chats del usuario");
      }

      const data = await response.json();
      // Filtrar los chats por el userId si es necesario
      return data.ChatSession || [];
    }),

  // Método para continuar una conversación específica
  continueChat: publicProcedure
    .input(z.object({ chatSessionId: z.string(), message: z.string() }))
    .mutation(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/getChatSession`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${env.ABACUS_API_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          chatSessionId: input.chatSessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al continuar la conversación");
      }

      const chatData = await response.json();

      // Aquí puedes manejar la lógica para enviar un nuevo mensaje al chat
      const sendMessageResponse = await fetch(
        `${env.ABACUS_API_URL}/sendMessage`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.ABACUS_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatSessionId: input.chatSessionId,
            message: input.message,
          }),
        }
      );

      if (!sendMessageResponse.ok) {
        throw new Error("Error al enviar el mensaje");
      }

      return sendMessageResponse.json();
    }),

  // Método para renombrar un chat
  renameChat: publicProcedure
    .input(z.object({ chatSessionId: z.string(), newName: z.string() }))
    .mutation(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/renameChatSession`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.ABACUS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatSessionId: input.chatSessionId,
          name: input.newName,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al renombrar el chat");
      }

      return { success: true };
    }),

  // Método para exportar un chat a HTML
  exportChat: publicProcedure
    .input(z.object({ chatSessionId: z.string() }))
    .mutation(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/exportChatSession`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.ABACUS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatSessionId: input.chatSessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al exportar el chat");
      }

      return response.json();
    }),
});