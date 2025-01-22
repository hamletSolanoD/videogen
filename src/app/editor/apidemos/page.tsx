"use client"

import { useState } from "react";
import { api } from "~/utils/api";

export default function TestAbacus() {
  // Estados para los diferentes inputs
  const [userId, setUserId] = useState("");
  const [chatSessionId, setChatSessionId] = useState("");
  const [message, setMessage] = useState("");
  const [newName, setNewName] = useState("");

  // Obtener las funciones del router
  const utils = api.useContext();

  const getChatsByUserIdQuery = api.abacusClientRouter.getChatsByUserId.useQuery(
    { userId },
    { enabled: false }
  );

  const continueChatMutation = api.abacusClientRouter.continueChat.useMutation({
    onSuccess: (data: any) => console.log("Continue Chat Response:", data),
    onError: (error: any) => console.error("Continue Chat Error:", error),
  });

  const renameChatMutation = api.abacusClientRouter.renameChat.useMutation({
    onSuccess: (data: any) => console.log("Rename Chat Response:", data),
    onError: (error: any) => console.error("Rename Chat Error:", error),
  });

  const exportChatMutation = api.abacusClientRouter.exportChat.useMutation({
    onSuccess: (data: any) => console.log("Export Chat Response:", data),
    onError: (error: any) => console.error("Export Chat Error:", error),
  });

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Get Chats by User ID</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
            className="border p-2 rounded"
          />
          <button
            onClick={() => {
              getChatsByUserIdQuery.refetch()
                .then((result: { data: any; }) => console.log("Chats:", result.data))
                .catch((error: any) => console.error("Error:", error));
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Get Chats
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Continue Chat</h3>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={chatSessionId}
            onChange={(e) => setChatSessionId(e.target.value)}
            placeholder="Chat Session ID"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="border p-2 rounded"
          />
          <button
            onClick={() => continueChatMutation.mutate({ chatSessionId, message })}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Continue Chat
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Rename Chat</h3>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={chatSessionId}
            onChange={(e) => setChatSessionId(e.target.value)}
            placeholder="Chat Session ID"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New Name"
            className="border p-2 rounded"
          />
          <button
            onClick={() => renameChatMutation.mutate({ chatSessionId, newName })}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Rename Chat
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Export Chat</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={chatSessionId}
            onChange={(e) => setChatSessionId(e.target.value)}
            placeholder="Chat Session ID"
            className="border p-2 rounded"
          />
          <button
            onClick={() => exportChatMutation.mutate({ chatSessionId })}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Export Chat
          </button>
        </div>
      </div>
    </div>
  );
}