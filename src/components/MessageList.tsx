
import React, { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ChatMessage } from '@/contexts/ChatContext';
import { formatTimestamp } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface MessageListProps {
  messages: ChatMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const { currentUser } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll al final cuando llegan nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!messages.length) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 text-gray-500 text-sm">
        No hay mensajes. Envía tu primer mensaje para iniciar la conversación.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.userId === currentUser?.id;

        return (
          <div 
            key={message.id} 
            className={cn(
              "flex items-end space-x-2",
              isCurrentUser ? "justify-end" : "justify-start"
            )}
          >
            {!isCurrentUser && (
              <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0" />
            )}

            <div className="max-w-[70%]">
              <div 
                className={cn(
                  "px-3 py-2 rounded-lg text-sm",
                  isCurrentUser 
                    ? "bg-wfc-purple text-white rounded-br-none" 
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                )}
              >
                {message.content}
              </div>
              <div 
                className={cn(
                  "text-xs text-gray-500 mt-1",
                  isCurrentUser ? "text-right" : "text-left"
                )}
              >
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};
