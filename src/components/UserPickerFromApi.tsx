
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { useData } from '@/contexts/DataContext';
import { Loader2 } from 'lucide-react';

export interface SimpleUser {
  id: string;
  name: string;
  photoURL?: string;
}

interface UserPickerProps {
  selectedUsers: SimpleUser[];
  onSelect: (user: SimpleUser) => void;
}

export const UserPickerFromApi: React.FC<UserPickerProps> = ({ selectedUsers, onSelect }) => {
  const { users, loading } = useData();
  const [filteredUsers, setFilteredUsers] = useState<SimpleUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar usuarios que ya están seleccionados y por búsqueda
  useEffect(() => {
    const selectedIds = new Set(selectedUsers.map(user => user.id));
    const filtered = users.filter(user => 
      !selectedIds.has(user.id) && 
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, selectedUsers, searchQuery]);

  return (
    <div className="w-full">
      <Command className="rounded-lg border shadow-md">
        <CommandInput 
          placeholder="Buscar usuarios..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandEmpty>
          {loading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-5 w-5 animate-spin text-wfc-purple" />
              <span className="ml-2">Cargando usuarios...</span>
            </div>
          ) : (
            "No se encontraron usuarios"
          )}
        </CommandEmpty>
        <CommandGroup className="max-h-64 overflow-auto">
          {filteredUsers.map(user => (
            <CommandItem
              key={user.id}
              value={user.id}
              onSelect={() => onSelect(user)}
              className="flex items-center py-2 cursor-pointer hover:bg-wfc-purple/10"
            >
              <Avatar className="h-7 w-7 mr-2">
                <AvatarImage src={user.photoURL} alt={user.name} />
                <AvatarFallback className="bg-wfc-purple-medium text-white text-xs">
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{user.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>
    </div>
  );
};
