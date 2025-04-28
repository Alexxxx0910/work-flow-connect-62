
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import { Chat } from '@/contexts/ChatContext';

interface ChatHeaderProps {
  chat: Chat | null;
  onBack: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, onBack }) => {
  if (!chat) return null;

  // Si es un chat individual, mostrar información del otro participante
  const otherParticipant = chat.isGroup 
    ? null 
    : chat.participants.find(p => p.id !== '1'); // Asumimos que el usuario actual tiene ID '1'

  const getChatName = () => {
    if (chat.isGroup) return chat.name || 'Chat Grupal';
    return otherParticipant?.name || 'Chat';
  };

  const isOnline = otherParticipant?.isOnline || false;

  return (
    <div className="flex items-center justify-between p-3 border-b bg-background">
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <Avatar>
          <AvatarImage src={otherParticipant?.photoURL} />
          <AvatarFallback className="bg-wfc-purple-medium text-white">
            {getChatName().charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h3 className="font-medium text-sm">{getChatName()}</h3>
          {!chat.isGroup && (
            <p className="text-xs text-muted-foreground">
              {isOnline ? 'En línea' : 'Desconectado'}
            </p>
          )}
        </div>
      </div>
      
      <Button variant="ghost" size="icon">
        <MoreVertical className="h-5 w-5" />
      </Button>
    </div>
  );
};
