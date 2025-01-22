// components/VideoSearchBar.tsx
import React from 'react';
import videoGenChatProps from './videoGenChatCard';

interface VideoSearchBarProps {
  onSearch: (searchTerm: string) => void;
  onFilterPrivacy: (privacy: videoGenChatProps['privacy'] | 'all') => void;
  onFilterPhase: (phase: videoGenChatProps['generation_phase'] | 'all') => void;
}

export const VideoSearchBar: React.FC<VideoSearchBarProps> = ({
  onSearch,
  onFilterPrivacy,
  onFilterPhase,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterPrivacy, setFilterPrivacy] = React.useState<videoGenChatProps['privacy'] | 'all'>('all');
  const [filterPhase, setFilterPhase] = React.useState<videoGenChatProps['generation_phase'] | 'all'>('all');

  // Manejadores de cambios con debounce para la búsqueda
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearch]);

  // Manejadores para los filtros
  const handlePrivacyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as videoGenChatProps['privacy'] | 'all';
    setFilterPrivacy(value);
    onFilterPrivacy(value);
  };

  const handlePhaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as videoGenChatProps['generation_phase'] | 'all';
    setFilterPhase(value);
    onFilterPhase(value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md sticky top-0 z-10">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by title, description or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterPrivacy}
            onChange={handlePrivacyChange}
          >
            <option value="all">All Privacy</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="restricted">Restricted</option>
          </select>

          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterPhase}
            onChange={handlePhaseChange}
          >
            <option value="all">All Phases</option>
            <option value="chat">Chat</option>
            <option value="media selection">Media Selection</option>
            <option value="voice generation">Voice Generation</option>
            <option value="media matching">Media Matching</option>
            <option value="final render">Final Render</option>
            <option value="complete">Complete</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VideoSearchBar;