
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, Briefcase, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-wfc-purple/10 to-white dark:from-wfc-purple/20 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Navbar */}
        <nav className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-wfc-purple flex items-center justify-center">
              <span className="text-white font-bold">WFC</span>
            </div>
            <span className="text-lg font-bold">WorkFlow Connect</span>
          </div>
          <div className="space-x-2">
            <Link to="/login">
              <Button variant="outline">Iniciar sesión</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-wfc-purple hover:bg-wfc-purple-medium">Registrarse</Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block">Comunícate en tiempo real con</span>
            <span className="block text-wfc-purple">WorkFlow Connect</span>
          </h1>
          <p className="mt-6 text-xl max-w-2xl mx-auto">
            La plataforma que conecta profesionales y clientes con herramientas de comunicación en tiempo real.
          </p>
          <div className="mt-10">
            <Link to="/register">
              <Button className="px-8 py-6 text-lg bg-wfc-purple hover:bg-wfc-purple-medium">
                Comenzar ahora
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="py-12">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-6xl lg:px-8">
            <h2 className="text-3xl font-extrabold text-center mb-16">Características principales</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-6 py-8 text-center">
                <div className="text-wfc-purple mx-auto h-12 w-12 flex items-center justify-center rounded-md bg-wfc-purple/10">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-medium">Chat en tiempo real</h3>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Comunícate instantáneamente con clientes o profesionales mediante nuestro sistema de chat en tiempo real.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-6 py-8 text-center">
                <div className="text-wfc-purple mx-auto h-12 w-12 flex items-center justify-center rounded-md bg-wfc-purple/10">
                  <Briefcase className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-medium">Gestión de propuestas</h3>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Crea, gestiona y responde a propuestas de trabajo fácilmente con nuestro sistema integrado.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-6 py-8 text-center">
                <div className="text-wfc-purple mx-auto h-12 w-12 flex items-center justify-center rounded-md bg-wfc-purple/10">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-medium">Perfiles profesionales</h3>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Crea un perfil detallado para mostrar tus habilidades o encuentra profesionales según tus necesidades.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-20 border-t py-8">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-wfc-purple flex items-center justify-center">
                <span className="text-white font-bold text-xs">WFC</span>
              </div>
              <span className="text-sm font-semibold">WorkFlow Connect</span>
            </div>
            <p className="text-sm text-gray-500">© 2025 WorkFlow Connect. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
