"use client"

import { useState } from "react";
import { api } from "~/utils/api";

export default function TestAbacus() {
  // Estados para los diferentes inputs
  const [userId, setUserId] = useState("");
  const [chatSessionId, setChatSessionId] = useState("");
  const [message, setMessage] = useState("");
  const [newName, setNewName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [keyword, setKeyword] = useState("");
  const [exportFormat, setExportFormat] = useState<"HTML" | "JSON">("HTML");
  const [initialMessage, setInitialMessage] = useState("");

  // Obtener las funciones del router
  const utils = api.useContext();

  // Queries
  const getChatsByUserIdQuery = api.abacusClientRouter.getChatsByUserId.useQuery(
    { userId },
    { enabled: false }
  );

  const getChatDetailsQuery = api.abacusClientRouter.getChatDetails.useQuery(
    { chatSessionId },
    { enabled: false }
  );

  const getChatHistoryQuery = api.abacusClientRouter.getChatHistory.useQuery(
    { chatSessionId },
    { enabled: false }
  );

  const searchMessagesQuery = api.abacusClientRouter.searchMessages.useQuery(
    { chatSessionId, keyword },
    { enabled: false }
  );

  // Mutations
  const continueChatMutation = api.abacusClientRouter.continueChat.useMutation({
    onSuccess: (data) => console.log("Continue Chat Response:", data),
    onError: (error) => console.error("Continue Chat Error:", error),
  });

  const renameChatMutation = api.abacusClientRouter.renameChat.useMutation({
    onSuccess: (data) => console.log("Rename Chat Response:", data),
    onError: (error) => console.error("Rename Chat Error:", error),
  });

  const exportChatMutation = api.abacusClientRouter.exportChat.useMutation({
    onSuccess: (data) => console.log("Export Chat Response:", data),
    onError: (error) => console.error("Export Chat Error:", error),
  });

  const createChatMutation = api.abacusClientRouter.createChat.useMutation({
    onSuccess: (data) => console.log("Create Chat Response:", data),
    onError: (error) => console.error("Create Chat Error:", error),
  });

  const deleteChatMutation = api.abacusClientRouter.deleteChat.useMutation({
    onSuccess: (data) => console.log("Delete Chat Response:", data),
    onError: (error) => console.error("Delete Chat Error:", error),
  });

  const customizeChatMutation = api.abacusClientRouter.customizeChat.useMutation({
    onSuccess: (data) => console.log("Customize Chat Response:", data),
    onError: (error) => console.error("Customize Chat Error:", error),
  });

  const markChatAsFavoriteMutation = api.abacusClientRouter.markChatAsFavorite.useMutation({
    onSuccess: (data) => console.log("Mark as Favorite Response:", data),
    onError: (error) => console.error("Mark as Favorite Error:", error),
  });

  const exportAllChatsMutation = api.abacusClientRouter.exportAllChats.useMutation({
    onSuccess: (data) => console.log("Export All Chats Response:", data),
    onError: (error) => console.error("Export All Chats Error:", error),
  });

  const closeChatMutation = api.abacusClientRouter.closeChat.useMutation({
    onSuccess: (data) => console.log("Close Chat Response:", data),
    onError: (error) => console.error("Close Chat Error:", error),
  });

  return (
    <div className="p-4 space-y-6">
      {/* Get Chats by User ID */}
      <div className="space-y-4 border p-4 rounded">
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
            onClick={() => getChatsByUserIdQuery.refetch()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Get Chats
          </button>
        </div>
      </div>

      {/* Create New Chat */}
      <div className="space-y-4 border p-4 rounded">
        <h3 className="text-lg font-semibold">Create New Chat</h3>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Chat Name"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={initialMessage}
            onChange={(e) => setInitialMessage(e.target.value)}
            placeholder="Initial Message"
            className="border p-2 rounded"
          />
          <button
            onClick={() => createChatMutation.mutate({ name: newName, initialMessage ,projectId: "e53cdb3d6"})}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Create Chat
          </button>
        </div>
      </div>

      {/* Continue Chat */}
      <div className="space-y-4 border p-4 rounded">
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
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send Message
          </button>
        </div>
      </div>

      {/* Chat Management */}
      <div className="space-y-4 border p-4 rounded">
        <h3 className="text-lg font-semibold">Chat Management</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => deleteChatMutation.mutate({ chatSessionId })}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Chat
          </button>
          <button
            onClick={() => markChatAsFavoriteMutation.mutate({ chatSessionId })}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Mark as Favorite
          </button>
          <button
            onClick={() => closeChatMutation.mutate({ chatSessionId })}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Close Chat
          </button>
          <button
            onClick={() => getChatDetailsQuery.refetch()}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Get Chat Details
          </button>
        </div>
      </div>

      {/* Customize Chat */}
      <div className="space-y-4 border p-4 rounded">
        <h3 className="text-lg font-semibold">Customize Chat</h3>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="border p-2 rounded"
          />
          <button
            onClick={() => customizeChatMutation.mutate({
              chatSessionId,
              description,
              tags: tags.split(',').map(tag => tag.trim())
            })}
            className="bg-indigo-500 text-white px-4 py-2 rounded"
          >
            Customize Chat
          </button>
        </div>
      </div>

      {/* Export Options */}
      <div className="space-y-4 border p-4 rounded">
        <h3 className="text-lg font-semibold">Export Options</h3>
        <div className="flex flex-col gap-2">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as "HTML" | "JSON")}
            className="border p-2 rounded"
          >
            <option value="HTML">HTML</option>
            <option value="JSON">JSON</option>
          </select>
          <button
            onClick={() => exportAllChatsMutation.mutate({ userId, format: exportFormat })}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Export All Chats
          </button>
          <button
            onClick={() => exportChatMutation.mutate({ chatSessionId })}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Export Single Chat
          </button>
        </div>
      </div>

      {/* Search Messages */}
      <div className="space-y-4 border p-4 rounded">
        <h3 className="text-lg font-semibold">Search Messages</h3>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search keyword"
            className="border p-2 rounded"
          />
          <button
            onClick={() => searchMessagesQuery.refetch()}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Search Messages
          </button>
        </div>
      </div>
    </div>
  );
}