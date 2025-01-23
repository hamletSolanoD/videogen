"use client"

import { VideoGenChat } from "~/app/_components/chatlist/videoGenChat";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { use } from "react";

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const [chatData, setChatData] = useState<any>(null);
  
  const unwrappedParams = use(params);

  const chatHistory = api.abacusClientRouter.getChatHistory.useQuery(
    { chatSessionId: unwrappedParams.id }
  );

  useEffect(() => {
    if (chatHistory.data?.result) {
      const processedData = {
        id: chatHistory.data.result.chatSessionId,
        title: chatHistory.data.result.name || "Untitled Chat",
        privacy: "public" as const,
        owner: chatHistory.data.result.projectId,
        description: chatHistory.data.result.whiteboard || "",
        generation_phase: "chat" as const,
      };

      setChatData(processedData);
      console.log("Chat History Data:", chatHistory.data);
    }
  }, [chatHistory.data]);

  if (chatHistory.isLoading) {
    return <div>Loading...</div>;
  }

  if (chatHistory.isError) {
    return <div>Error loading chat data</div>;
  }

  if (!chatData) {
    return null;
  }

  return (
    <div className="h-full">
      <VideoGenChat chatData={chatData} />
    </div>
  );
}