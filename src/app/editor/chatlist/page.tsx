
// app/editor/chatlist/page.tsx
'use client';

import React from 'react';
import VideoGenChatCard from '~/app/_components/chatlist/videoGenChatCard';
import videoGenChatProps from '~/app/_components/chatlist/videoGenChatCard';
import VideoSearchBar from '~/app/_components/chatlist/VideoSearchBar';

// Datos mock
const mockChats = [
  {
    id: '1',
    title: "Summer Vacation Memories",
    privacy: "public" as const,
    owner: "travel_enthusiast",
    description: "A beautiful compilation of my summer vacation highlights, featuring scenic beaches and mountain adventures. This video will showcase the best moments captured during my three-week journey across Europe.",
    generation_phase: "complete" as const
  },
  {
    id: '2',
    title: "Cooking Tutorial: Italian Pasta",
    privacy: "public" as const,
    owner: "chef_maria",
    description: "Learn how to make authentic Italian pasta from scratch. This step-by-step guide covers everything from making the perfect dough to creating delicious sauces.",
    generation_phase: "media matching" as const
  },
  {
    id: '3',
    title: "Project Presentation Draft",
    privacy: "private" as const,
    owner: "business_pro",
    description: "Internal presentation for the Q4 project results. Including key metrics, achievements, and future projections for stakeholders.",
    generation_phase: "voice generation" as const
  },
  {
    id: '4',
    title: "Fitness Workout Series",
    privacy: "restricted" as const,
    owner: "fit_trainer",
    description: "A comprehensive 30-minute full-body workout routine suitable for beginners. Includes warm-up and cool-down exercises.",
    generation_phase: "final render" as const
  },
  {
    id: '5',
    title: "Team Meeting Recap",
    privacy: "private" as const,
    owner: "team_lead",
    description: "Summary of our weekly team meeting discussing upcoming projects, deadlines, and resource allocation for the next sprint.",
    generation_phase: "chat" as const
  }
];
export default function ChatList() {
  // Estado para los filtros y búsqueda
  const [filteredVideos, setFilteredVideos] = React.useState<videoGenChatProps[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [privacyFilter, setPrivacyFilter] = React.useState<videoGenChatProps['privacy'] | 'all'>('all');
  const [phaseFilter, setPhaseFilter] = React.useState<videoGenChatProps['generation_phase'] | 'all'>('all');

  // Función para filtrar videos (más tarde se moverá a tRPC)
  const filterVideos = React.useCallback(() => {
    const filtered = mockChats.filter(video => {
      const matchesSearch = 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.owner.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrivacy = privacyFilter === 'all' || video.privacy === privacyFilter;
      const matchesPhase = phaseFilter === 'all' || video.generation_phase === phaseFilter;

      return matchesSearch && matchesPrivacy && matchesPhase;
    });

    setFilteredVideos(filtered);
  }, [searchTerm, privacyFilter, phaseFilter]);

  // Efecto para actualizar los filtros
  React.useEffect(() => {
    filterVideos();
  }, [filterVideos]);

  return (
    <div className="space-y-6">
      <VideoSearchBar
        onSearch={setSearchTerm}
        onFilterPrivacy={setPrivacyFilter}
        onFilterPhase={setPhaseFilter}
      />
      
      <div className="space-y-6">
        {filteredVideos.map((chat, index) => (
          <VideoGenChatCard
            key={index}
            {...chat}
          />
        ))}
      </div>
    </div>
  );
}