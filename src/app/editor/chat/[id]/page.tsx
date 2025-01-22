import { VideoGenChat } from "~/app/_components/chatlist/videoGenChat";

export default function ChatPage({ params }: { params: { id: string } }) {
  // Mock data for development
  const mockChatData = {
    id: params.id,
    title: "Example Video Project",
    privacy: "public" as const,
    owner: "demo_user",
    description: "This is a sample video generation project to demonstrate the chat interface.",
    generation_phase: "chat" as const,
  };

  return (
    <div className="h-full">
      <VideoGenChat chatData={mockChatData} />
    </div>
  );
}