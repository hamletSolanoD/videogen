'use client';

import React from 'react';
import NewChatModal from '~/app/_components/chatlist/newVideoGenChatModal';
import VideoGenChatCard from '~/app/_components/chatlist/videoGenChatCard';
import VideoSearchBar from '~/app/_components/chatlist/VideoSearchBar';
import { api } from "~/trpc/react";

export default function ChatList() {
  const [filteredVideos, setFilteredVideos] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [privacyFilter, setPrivacyFilter] = React.useState<'public' | 'private' | 'restricted' | 'all'>('all');
  const [phaseFilter, setPhaseFilter] = React.useState<'chat' | 'media matching' | 'voice generation' | 'final render' | 'complete' | 'media selection' | 'published' | 'all'>('all');
  const [isNewChatModalOpen, setIsNewChatModalOpen] = React.useState(false);
  // Llama al procedimiento tRPC para obtener los chats
  const { data: chats, isLoading, error } = api.abacusClientRouter.getChatsByUserId.useQuery({
    userId: "your-user-id" // Reemplaza esto con el ID de usuario real
  });

  // Mapea los datos de la API a las propiedades esperadas por el componente
  const mappedChats = React.useMemo(() => {
    if (!chats) return [];
    return chats.map((chat: { chatSessionId: any; name: any; projectId: any; }) => ({
      id: chat.chatSessionId,
      title: chat.name,
      privacy: 'public', // Ajusta esto según tu lógica
      owner: 'unknown', // Ajusta esto según tu lógica
      description: `Project ID: ${chat.projectId}`, // Ajusta esto según tu lógica
      generation_phase: 'complete', // Ajusta esto según tu lógica
    }));
  }, [chats]);

  // Filtra los videos según los criterios de búsqueda y filtros
  const filterVideos = React.useCallback(() => {
    if (!mappedChats) return;

    const filtered = mappedChats.filter((video: { title: string; description: string; owner: string; privacy: string; generation_phase: string; }) => {
      const matchesSearch =
        (video.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (video.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (video.owner?.toLowerCase() || '').includes(searchTerm.toLowerCase());

      const matchesPrivacy = privacyFilter === 'all' || video.privacy === privacyFilter;
      const matchesPhase = phaseFilter === 'all' || video.generation_phase === phaseFilter;

      return matchesSearch && matchesPrivacy && matchesPhase;
    });

    setFilteredVideos(filtered);
  }, [searchTerm, privacyFilter, phaseFilter, mappedChats]);

  React.useEffect(() => {
    filterVideos();
  }, [filterVideos]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col space-y-4 px-6">
        <VideoSearchBar
          onSearch={setSearchTerm}
          onFilterPrivacy={setPrivacyFilter}
          onFilterPhase={setPhaseFilter}
        />
      <button
      onClick={() => setIsNewChatModalOpen(true)}
      className="self-end rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      New Video Gen Chat
    </button>
      </div>

      {/* Chat List */}
      <div className="px-6 space-y-6">
        {filteredVideos.map((chat) => (
          <VideoGenChatCard key={chat.id} {...chat} />
        ))}
      </div>

      {/* New Chat Modal */}
      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
      />
    </div>
  );
}