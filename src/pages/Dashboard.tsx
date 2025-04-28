
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/contexts/ChatContext';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Briefcase, User } from 'lucide-react';

const Dashboard = () => {
  const { currentUser, isLoggedIn } = useAuth();
  const { chats, fetchChats } = useChat();
  
  // Refrescar datos cuando se carga el dashboard
  useEffect(() => {
    if (isLoggedIn) {
      fetchChats();
    }
  }, [fetchChats, isLoggedIn]);
  
  // Filtrar chats con mensajes no leídos
  const unreadChats = chats.filter(chat => 
    chat.messages.some(message => 
      !message.read && message.userId !== currentUser?.id
    )
  );

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Bienvenido, {currentUser?.name || 'Usuario'}
          </h1>
          <p className="text-muted-foreground">
            Accede a todas las herramientas en un solo lugar
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tarjeta de mensajes */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5 text-wfc-purple" />
                Mensajes
              </CardTitle>
              <CardDescription>
                Gestiona tus conversaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {unreadChats.length > 0 ? (
                  `Tienes ${unreadChats.length} ${unreadChats.length === 1 ? 'conversación' : 'conversaciones'} con mensajes sin leer.`
                ) : (
                  'No tienes mensajes nuevos.'
                )}
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/chats" className="w-full">
                <Button className="w-full bg-wfc-purple hover:bg-wfc-purple-medium">
                  Ir a mensajes
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* Tarjeta de propuestas */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-wfc-purple" />
                Propuestas
              </CardTitle>
              <CardDescription>
                Explora oportunidades de trabajo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Encuentra nuevas oportunidades o publica tus propias ofertas.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/jobs" className="w-full">
                <Button variant="outline" className="w-full">
                  Ver propuestas
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          {/* Tarjeta de perfil */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-wfc-purple" />
                Tu perfil
              </CardTitle>
              <CardDescription>
                Administra tu información
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Completa tu perfil para mejorar tu visibilidad.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/profile" className="w-full">
                <Button variant="outline" className="w-full">
                  Editar perfil
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
