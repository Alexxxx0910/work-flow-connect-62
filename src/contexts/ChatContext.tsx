
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import io, { Socket } from 'socket.io-client';
import { toast } from '@/components/ui/use-toast';

export interface ChatMessage {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  timestamp: number;
  read: boolean;
}

export interface Chat {
  id: string;
  name: string;
  isGroup: boolean;
  lastMessageAt: number;
  participants: {
    id: string;
    name: string;
    photoURL?: string;
    isOnline?: boolean;
    lastSeen?: number;
  }[];
  messages: ChatMessage[];
}

interface ChatContextType {
  chats: Chat[];
  activeChat: Chat | null;
  setActiveChat: (chat: Chat | null) => void;
  messages: ChatMessage[];
  sendMessage: (content: string) => void;
  createChat: (participantIds: string[], name?: string) => Promise<Chat>;
  loading: boolean;
  fetchChats: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, isLoggedIn } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState(false);

  // Inicializar socket
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      // Conectar a socket.io (usamos una URL mockeada para este ejemplo)
      const newSocket = io('http://localhost:5000', {
        auth: {
          token: 'mock-token' // En un caso real, usaríamos un token JWT
        }
      });

      newSocket.on('connect', () => {
        console.log('Socket conectado');
      });

      newSocket.on('disconnect', () => {
        console.log('Socket desconectado');
      });

      newSocket.on('connect_error', (err) => {
        console.error('Error de conexión socket:', err);
        toast({
          variant: "destructive",
          title: "Error de conexión",
          description: "No se pudo conectar al servidor de chat",
        });
      });

      newSocket.on('new_message', (message: ChatMessage) => {
        // Añadir el nuevo mensaje al estado
        setMessages(prev => [...prev, message]);
        
        // Actualizar la lista de chats para mostrar el último mensaje
        setChats(prev => {
          return prev.map(chat => {
            if (chat.id === activeChat?.id) {
              return {
                ...chat,
                messages: [...chat.messages, message],
                lastMessageAt: message.timestamp
              };
            }
            return chat;
          });
        });
        
        // Si el mensaje no es del usuario actual, mostrar notificación
        if (message.userId !== currentUser?.id && Notification.permission === 'granted') {
          new Notification(`Nuevo mensaje de ${message.userName}`, {
            body: message.content
          });
        }
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [isLoggedIn, currentUser]);

  // Cuando se selecciona un chat activo, cargar sus mensajes
  useEffect(() => {
    if (activeChat) {
      setMessages(activeChat.messages || []);
      
      // Marcar mensajes como leídos cuando se abre el chat
      if (socket && currentUser) {
        socket.emit('mark_read', { chatId: activeChat.id });
      }
    } else {
      setMessages([]);
    }
  }, [activeChat, socket, currentUser]);

  // Función para cargar los chats del usuario
  const fetchChats = useCallback(async () => {
    if (!isLoggedIn) return;
    
    setLoading(true);
    try {
      // Simulamos la carga de chats (esto sería una llamada a la API)
      // En un caso real, obtendríamos los datos del servidor
      const mockChats: Chat[] = [
        {
          id: "1",
          name: "",
          isGroup: false,
          lastMessageAt: Date.now() - 3600000, // 1 hora atrás
          participants: [
            {
              id: "1",
              name: "Usuario Demo",
              photoURL: "",
              isOnline: true
            },
            {
              id: "2",
              name: "Ana García",
              photoURL: "",
              isOnline: true
            }
          ],
          messages: [
            {
              id: "101",
              content: "Hola, ¿cómo estás?",
              userId: "2",
              userName: "Ana García",
              timestamp: Date.now() - 3600000,
              read: true
            },
            {
              id: "102",
              content: "Todo bien, gracias. ¿Y tú?",
              userId: "1",
              userName: "Usuario Demo",
              timestamp: Date.now() - 3500000,
              read: true
            }
          ]
        },
        {
          id: "2",
          name: "",
          isGroup: false,
          lastMessageAt: Date.now() - 7200000, // 2 horas atrás
          participants: [
            {
              id: "1",
              name: "Usuario Demo",
              photoURL: "",
              isOnline: true
            },
            {
              id: "3",
              name: "Carlos Rodríguez",
              photoURL: "",
              isOnline: false
            }
          ],
          messages: [
            {
              id: "201",
              content: "¿Puedes revisar el documento que te envié?",
              userId: "3",
              userName: "Carlos Rodríguez",
              timestamp: Date.now() - 7200000,
              read: true
            }
          ]
        }
      ];
      
      setChats(mockChats);
    } catch (error) {
      console.error('Error al cargar chats:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los chats",
      });
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  // Cargar chats al iniciar
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // Función para enviar un mensaje
  const sendMessage = (content: string) => {
    if (!socket || !activeChat || !currentUser) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
      });
      return;
    }

    const newMessage: ChatMessage = {
      id: `temp-${Date.now()}`, // ID temporal
      content,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhoto: currentUser.photoURL,
      timestamp: Date.now(),
      read: false
    };

    // Optimistic update: añadir mensaje localmente
    setMessages(prev => [...prev, newMessage]);
    
    // Emitir mensaje a través de socket
    socket.emit('send_message', {
      chatId: activeChat.id,
      content
    });
  };

  // Función para crear un nuevo chat
  const createChat = async (participantIds: string[], name?: string): Promise<Chat> => {
    if (!isLoggedIn || !currentUser) {
      throw new Error('Debes iniciar sesión para crear un chat');
    }

    try {
      setLoading(true);
      
      // En un caso real, esto sería una llamada a la API
      // Simulamos la creación de un chat
      const isGroup = participantIds.length > 1;
      const newChat: Chat = {
        id: `new-${Date.now()}`,
        name: name || "",
        isGroup,
        lastMessageAt: Date.now(),
        participants: [
          {
            id: currentUser.id,
            name: currentUser.name,
            photoURL: currentUser.photoURL,
            isOnline: true
          },
          // Simulamos datos para el otro participante
          {
            id: participantIds[0],
            name: "Nuevo Contacto",
            photoURL: "",
            isOnline: false
          }
        ],
        messages: []
      };
      
      // Actualizar la lista de chats
      setChats(prev => [...prev, newChat]);
      
      // Establecer el nuevo chat como activo
      setActiveChat(newChat);
      
      return newChat;
    } catch (error) {
      console.error('Error al crear chat:', error);
      throw new Error('No se pudo crear el chat');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    chats,
    activeChat,
    setActiveChat,
    messages,
    sendMessage,
    createChat,
    loading,
    fetchChats
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
