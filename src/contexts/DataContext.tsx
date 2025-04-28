
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export interface SimpleUser {
  id: string;
  name: string;
  photoURL?: string;
  isOnline?: boolean;
}

interface DataContextType {
  users: SimpleUser[];
  jobCategories: string[];
  skillsList: string[];
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<SimpleUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  const jobCategories = [
    "Desarrollo Web",
    "Diseño Gráfico",
    "Marketing Digital",
    "Desarrollo Móvil",
    "Traducción",
    "Redacción",
    "Edición de Video",
    "Consultoría"
  ];
  
  const skillsList = [
    "JavaScript",
    "React",
    "Node.js",
    "TypeScript",
    "Python",
    "PHP",
    "Java",
    "HTML/CSS",
    "Photoshop",
    "Illustrator",
    "After Effects",
    "SEO",
    "Marketing de Contenidos",
    "Redes Sociales",
    "Flutter",
    "React Native",
    "Swift",
    "Kotlin",
    "WordPress",
    "Traducción"
  ];
  
  // Cargar usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulamos carga de datos (en un caso real sería una llamada a la API)
        const mockUsers = [
          { id: "2", name: "Ana García", photoURL: "", isOnline: true },
          { id: "3", name: "Carlos Rodríguez", photoURL: "", isOnline: false },
          { id: "4", name: "Laura Martínez", photoURL: "", isOnline: true },
          { id: "5", name: "David López", photoURL: "", isOnline: false },
          { id: "6", name: "Elena Sánchez", photoURL: "", isOnline: true }
        ];
        
        setUsers(mockUsers);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los usuarios",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  const value = {
    users,
    jobCategories,
    skillsList,
    loading
  };
  
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
