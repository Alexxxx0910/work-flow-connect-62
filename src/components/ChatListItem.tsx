
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Chat } from '@/contexts/ChatContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatTimestamp, getInitials } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: (chat: Chat) => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isActive, onClick }) => {
  const { currentUser } = useAuth();
  
  // Para chats individuales, mostrar el otro participante
  const otherParticipant = chat.isGroup 
    ? null
    : chat.participants.find(p => p.id !== currentUser?.id);
  
  const chatName = chat.isGroup 
    ? (chat.name || `Grupo (${chat.participants.length})`) 
    : otherParticipant?.name || 'Chat';
  
  // Encontrar el último mensaje
  const lastMessage = chat.messages && chat.messages.length > 0 
    ? chat.messages[chat.messages.length - 1] 
    : null;
  
  // Verificar si hay mensajes no leídos
  const hasUnread = lastMessage 
    ? !lastMessage.read && lastMessage.userId !== currentUser?.id
    : false;
  
  return (
    <div 
      className={cn(
        "flex items-center p-3 cursor-pointer transition-colors",
        isActive ? "bg-wfc-purple/10" : "hover:bg-muted",
        hasUnread && "bg-wfc-purple/5"
      )}
      onClick={() => onClick(chat)}
    >
      <Avatar className="h-12 w-12 mr-3">
        <AvatarImage src={otherParticipant?.photoURL} />
        <AvatarFallback className={cn(
          "text-white",
          isActive ? "bg-wfc-purple" : "bg-wfc-purple-medium"
        )}>
          {getInitials(chatName)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className={cn(
            "font-medium text-sm truncate",
            hasUnread && "font-bold"
          )}>
            {chatName}
          </h3>
          {lastMessage && (
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {formatTimestamp(lastMessage.timestamp)}
            </span>
          )}
        </div>
        
        {lastMessage ? (
          <p className={cn(
            "text-xs text-muted-foreground truncate",
            hasUnread && "text-foreground font-medium"
          )}>
            {lastMessage.userId === currentUser?.id ? "Tú: " : ""}
            {lastMessage.content}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground italic">
            No hay mensajes
          </p>
        )}
      </div>
      
      {hasUnread && (
        <div className="w-2 h-2 rounded-full bg-wfc-purple ml-2"></div>
      )}
    </div>
  );
};
