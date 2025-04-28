
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Chat } from '@/contexts/ChatContext';
import { ChatListItem } from '@/components/ChatListItem';
import { NewChatButton } from '@/components/NewChatButton';

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  className?: string;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  chats, 
  activeChat, 
  onSelectChat,
  className = ""
}) => {
  return (
    <div className={`flex flex-col h-full bg-background border-r ${className}`}>
      <div className="p-4">
        <NewChatButton />
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9" 
            placeholder="Buscar chats..." 
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chats.length > 0 ? (
          chats.map(chat => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isActive={activeChat?.id === chat.id}
              onClick={onSelectChat}
            />
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No tienes chats activos. Crea uno nuevo para empezar a conversar.
          </div>
        )}
      </div>
    </div>
  );
};
