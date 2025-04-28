
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/contexts/ChatContext';
import { useIsMobile } from '@/hooks/use-mobile';
import MainLayout from '@/components/Layout/MainLayout';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatHeader } from '@/components/ChatHeader';
import { MessageList } from '@/components/MessageList';
import { MessageInput } from '@/components/MessageInput';

const ChatsPage = () => {
  const { currentUser } = useAuth();
  const { chats, activeChat, setActiveChat, messages, sendMessage, loading } = useChat();
  const isMobile = useIsMobile();
  const [showChatList, setShowChatList] = useState(true);
  
  const handleSelectChat = (chat: typeof activeChat) => {
    setActiveChat(chat);
    if (isMobile) {
      setShowChatList(false);
    }
  };
  
  const handleBackToList = () => {
    setShowChatList(true);
  };

  if (!currentUser) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-lg text-muted-foreground">
            Debes iniciar sesión para acceder a los chats.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* Sidebar de chats (en móvil se oculta al abrir un chat) */}
        {(!isMobile || showChatList) && (
          <div className={`${isMobile ? 'w-full' : 'w-1/3'}`}>
            <ChatSidebar
              chats={chats}
              activeChat={activeChat}
              onSelectChat={handleSelectChat}
            />
          </div>
        )}
        
        {/* Panel de chat actual (en móvil se muestra solo cuando se selecciona un chat) */}
        {(!isMobile || !showChatList) && (
          <div className={`${isMobile ? 'w-full' : 'w-2/3'} flex flex-col h-full`}>
            {activeChat ? (
              <>
                <ChatHeader chat={activeChat} onBack={handleBackToList} />
                <MessageList messages={messages} />
                <MessageInput 
                  onSendMessage={sendMessage} 
                  disabled={loading}
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-lg text-muted-foreground">
                  Selecciona un chat para empezar a conversar.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ChatsPage;
