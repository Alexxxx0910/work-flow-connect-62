
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Al iniciar, intentamos recuperar información del usuario desde localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulamos un login (normalmente esto sería una petición a la API)
      const mockUser = {
        id: '1',
        name: 'Usuario Demo',
        email: email,
        photoURL: ''
      };
      
      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de vuelta",
      });
    } catch (error) {
      console.error('Error en login:', error);
      toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: "Credenciales incorrectas o servidor no disponible",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulamos un registro (normalmente esto sería una petición a la API)
      const mockUser = {
        id: '1',
        name: name,
        email: email,
        photoURL: ''
      };
      
      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setCurrentUser(mockUser);
      
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente",
      });
    } catch (error) {
      console.error('Error en registro:', error);
      toast({
        variant: "destructive",
        title: "Error de registro",
        description: "No se pudo crear la cuenta. Inténtalo de nuevo.",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      // Eliminar usuario del localStorage
      localStorage.removeItem('user');
      setCurrentUser(null);
      
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
    } catch (error) {
      console.error('Error en logout:', error);
      toast({
        variant: "destructive",
        title: "Error al cerrar sesión",
        description: "No se pudo cerrar la sesión correctamente",
      });
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    isLoggedIn: !!currentUser,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
