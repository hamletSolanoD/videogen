"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { api } from "~/utils/api";
import { use } from "react";

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatData {
  id: string;
  title: string;
  privacy: 'public' | 'private';
  owner: string;
  description: string;
  generation_phase: string;
}

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatData, setChatData] = useState<ChatData | null>(null);
  
  const unwrappedParams = use(params);
  const chatSessionId = unwrappedParams.id;

  // Queries y Mutations de tRPC
  const { data: chatHistory, refetch: refetchHistory } = api.abacusClientRouter.getChatHistory.useQuery(
    { chatSessionId }
  );

  const sendMessageMutation = api.abacusClientRouter.continueChat.useMutation();

  // Función para cargar el historial inicial y configurar el chat
  const loadChatData = useCallback(() => {
    if (chatHistory?.result) {
      const processedData = {
        id: chatHistory.result.chatSessionId,
        title: chatHistory.result.name || "Untitled Chat",
        privacy: "public" as const,
        owner: chatHistory.result.projectId,
        description: chatHistory.result.whiteboard || "",
        generation_phase: "chat" as const,
      };

      setChatData(processedData);

      // Procesar mensajes del historial
      if (chatHistory.result.messages) {
        const formattedMessages = chatHistory.result.messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp
        }));
        setMessages(formattedMessages);
      }
    }
  }, [chatHistory]);

  // Polling para actualizar el chat
  useEffect(() => {
    loadChatData();

    const pollInterval = setInterval(() => {
      void refetchHistory();
    }, 10000); // Polling cada 3 segundos

    return () => clearInterval(pollInterval);
  }, [loadChatData, refetchHistory]);

  // Manejar el envío de mensajes
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !chatSessionId) return;

    try {
      // Optimistic update
      const newMessage: Message = {
        role: 'user',
        content: inputMessage,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');

      // Enviar mensaje a través de la mutación
      await sendMessageMutation.mutateAsync({
        chatSessionId,
        message: inputMessage
      });

      // Refrescar el historial para obtener la respuesta
      await refetchHistory();
    } catch (error) {
      console.error('Error sending message:', error);
      // Manejar el error apropiadamente
    }
  };

  if (!chatData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full bg-gray-100">
      {/* Sidebar con detalles del chat */}
      <div className="w-1/4 bg-white p-4 border-r border-gray-200">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Chat Details</h2>
          <div className="space-y-2">
            <h3 className="font-semibold">{chatData.title}</h3>
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">
                {chatData.privacy}
              </span>
              <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                {chatData.generation_phase}
              </span>
            </div>
            <p className="text-sm text-gray-600">{chatData.description}</p>
          </div>
        </div>
      </div>

      {/* Área principal del chat */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  <div>{message.content}</div>
                  <div className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Área de input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && void handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => void handleSendMessage()}
              disabled={sendMessageMutation.isPending}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {sendMessageMutation.isPending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}