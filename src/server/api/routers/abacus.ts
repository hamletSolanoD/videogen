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
          "apiKey": `${env.ABACUS_API_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los chats del usuario");
      }

      const data = await response.json();

      // Verifica que el campo `result` exista y sea un array
      if (!data.success || !Array.isArray(data.result)) {
        throw new Error("La respuesta de la API no contiene un resultado válido");
      }

      // Devuelve el array de chats
      return data.result;
    }),

  // Método para continuar una conversación específica
  continueChat: publicProcedure
    .input(z.object({ chatSessionId: z.string(), message: z.string() }))
    .mutation(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/getChatSession`, {
        method: "GET",
        headers: {
          "apiKey": `${env.ABACUS_API_KEY}`,
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
            "apiKey": `${env.ABACUS_API_KEY}`,
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
          "apiKey": `${env.ABACUS_API_KEY}`,
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
          apiKey: `${env.ABACUS_API_KEY}`,
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
  // Crear un nuevo chat
  createChat: publicProcedure
    .input(z.object({ name: z.string(), initialMessage: z.string() }))
    .mutation(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/createChatSession`, {
        method: "POST",
        headers: {
          "apiKey": `${env.ABACUS_API_KEY}`,
        },
        body: JSON.stringify({
          "projectId": `${env.ABACUS_PROJECT_ID}`,
          "name": input.name,
        }),
      });
      console.log("test", response, {
        projectId: `${env.ABACUS_PROJECT_ID}`,
        name: input.name,
      });

      if (!response.ok) {
        throw new Error("Error al crear el chat");
      }

      return response.json();
    }),

  // Eliminar un chat
  deleteChat: publicProcedure
    .input(z.object({ chatSessionId: z.string() }))
    .mutation(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/deleteChatSession`, {
        method: "DELETE",
        headers: {
          "apiKey": `${env.ABACUS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatSessionId: input.chatSessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el chat");
      }

      return { success: true };
    }),

  // Obtener detalles de un chat
  getChatDetails: publicProcedure
    .input(z.object({ chatSessionId: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/getChatSession`, {
        method: "GET",
        headers: {
          "apiKey": `${env.ABACUS_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los detalles del chat");
      }

      return response.json();
    }),

  // Personalizar un chat
  customizeChat: publicProcedure
    .input(z.object({ chatSessionId: z.string(), description: z.string(), tags: z.array(z.string()).optional() }))
    .mutation(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/customizeChatSession`, {
        method: "POST",
        headers: {
          "apiKey": `${env.ABACUS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatSessionId: input.chatSessionId,
          description: input.description,
          tags: input.tags,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al personalizar el chat");
      }

      return { success: true };
    }),

  // Obtener historial de mensajes
  getChatHistory: publicProcedure
    .input(z.object({ chatSessionId: z.string() })) // Recibe el ID de la sesión de chat
    .query(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/getChatSession`, {
        method: "GET",
        headers: {
          "apiKey": `${env.ABACUS_API_KEY}`, // Clave API para autenticación
        },
        body:  JSON.stringify({
          chatSessionId: input.chatSessionId, // ID de la sesión de chat
        }),
      });

      console.log("response",response.json())

      if (!response.ok) {
        throw new Error("Error al obtener el historial del chat");
      }

      return response.json(); // Devuelve el historial del chat
    }),

  // Marcar un chat como favorito
  markChatAsFavorite: publicProcedure
    .input(z.object({ chatSessionId: z.string() }))
    .mutation(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/markChatAsFavorite`, {
        method: "POST",
        headers: {
          "apiKey": `${env.ABACUS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatSessionId: input.chatSessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al marcar el chat como favorito");
      }

      return { success: true };
    }),

  // Buscar mensajes en un chat
  searchMessages: publicProcedure
    .input(z.object({ chatSessionId: z.string(), keyword: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/searchMessages`, {
        method: "POST",
        headers: {
          "apiKey": `${env.ABACUS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatSessionId: input.chatSessionId,
          keyword: input.keyword,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al buscar mensajes en el chat");
      }

      return response.json();
    }),

  // Exportar todos los chats de un usuario
  exportAllChats: publicProcedure
    .input(z.object({ userId: z.string(), format: z.enum(["HTML", "JSON"]) }))
    .mutation(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/exportAllChats`, {
        method: "POST",
        headers: {
          "apiKey": `${env.ABACUS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: input.userId,
          format: input.format,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al exportar los chats");
      }

      return response.json();
    }),

  // Cerrar un chat
  closeChat: publicProcedure
    .input(z.object({ chatSessionId: z.string() }))
    .mutation(async ({ input }) => {
      const response = await fetch(`${env.ABACUS_API_URL}/closeChatSession`, {
        method: "POST",
        headers: {
          "apiKey": `${env.ABACUS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatSessionId: input.chatSessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al cerrar el chat");
      }

      return { success: true };
    }),


});