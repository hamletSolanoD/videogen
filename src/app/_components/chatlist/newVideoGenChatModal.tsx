// app/_components/chatlist/NewChatModal.tsx
import React from 'react';
import { api } from "~/trpc/react";
import Modal from '../ui/modal';

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  initialMessage: string; // Cambiado de description a initialMessage
}

export const NewChatModal: React.FC<NewChatModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    initialMessage: '' // Cambiado de description a initialMessage
  });
  const [isLoading, setIsLoading] = React.useState(false);

  // Mutation para crear nuevo chat
  const createChat = api.abacusClientRouter.createChat.useMutation({
    onSuccess: () => {
      onClose();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await createChat.mutateAsync({
        name: formData.name,
        initialMessage: formData.initialMessage, // Cambiado de description a initialMessage
      });
    } catch (error) {
      console.error('Error creating chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Video Gen Chat"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="initialMessage" className="block text-sm font-medium text-gray-700">
            Initial Message
          </label>
          <textarea
            id="initialMessage"
            name="initialMessage"
            value={formData.initialMessage}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mt-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewChatModal;