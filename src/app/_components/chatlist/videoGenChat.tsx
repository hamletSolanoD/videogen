"use client"
import React from 'react';
import videoGenChatProps from './videoGenChatCard';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface VideoGenChatComponentProps {
  chatData: videoGenChatProps;
}

export const VideoGenChat: React.FC<VideoGenChatComponentProps> = ({ chatData }) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputMessage, setInputMessage] = React.useState('');

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
  };

  return (
    <div className="flex h-full bg-gray-100">
      {/* Video Info Sidebar */}
      <div className="w-1/4 bg-white p-4 border-r border-gray-200">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Video Details</h2>
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
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};