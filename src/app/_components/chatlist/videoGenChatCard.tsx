import { useRouter } from "next/navigation";

interface videoGenChatProps {
    id: string;
    title: string;
    privacy: 'private' | 'public' | 'restricted';
    owner: string;
    description: string;
    generation_phase: 'chat' | 'media selection' | 'voice generation' | 'media matching' | 'final render' | 'complete' | 'published';
  }
  
  const StatusBadge = ({ phase }: { phase: videoGenChatProps['generation_phase'] }) => {
    const getStatusColor = (phase: string) => {
      const colors = {
        chat: "bg-blue-200 text-blue-800",
        "media selection": "bg-purple-200 text-purple-800",
        "voice generation": "bg-yellow-200 text-yellow-800",
        "media matching": "bg-orange-200 text-orange-800",
        "final render": "bg-indigo-200 text-indigo-800",
        complete: "bg-green-200 text-green-800",
        published: "bg-teal-200 text-teal-800"
      };
      return colors[phase as keyof typeof colors] || "bg-gray-200 text-gray-800";
    };
  
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(phase)}`}>
        {phase}
      </span>
    );
  };
  
  const PrivacyBadge = ({ privacy }: { privacy: videoGenChatProps['privacy'] }) => {
    const getPrivacyColor = (privacy: string) => {
      const colors = {
        private: "bg-red-200 text-red-800",
        public: "bg-green-200 text-green-800",
        restricted: "bg-yellow-200 text-yellow-800"
      };
      return colors[privacy as keyof typeof colors] || "bg-gray-200 text-gray-800";
    };
  
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPrivacyColor(privacy)}`}>
        {privacy}
      </span>
    );
  };

  
  
  const videoGenChatProps = ({ id, title, privacy, owner, description, generation_phase }: videoGenChatProps) => {
    const router = useRouter();
    
    const handleClick = () => {
      router.push(`/editor/chat/${id}`);
    };
    return (
      <div 
      onClick={handleClick}
      className="flex bg-white rounded-lg shadow-lg overflow-hidden h-[250px] cursor-pointer hover:shadow-xl transition-shadow"
    >
        <div className="w-[30%] bg-gray-100 flex items-center justify-center p-4">
          <img
            src="https://placehold.co/300x400"
            alt="Video thumbnail"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
  
        <div className="w-[70%] p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <PrivacyBadge privacy={privacy} />
          </div>
  
          <div className="flex-grow">
            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
  
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              {/* Owner Info */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-700">@{owner}</span>
              </div>
  
              <StatusBadge phase={generation_phase} />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default videoGenChatProps;