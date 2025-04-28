
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChatGroupForm } from '@/components/ChatGroupForm';

export const NewChatButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full mb-4 bg-wfc-purple hover:bg-wfc-purple-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear nuevo chat</DialogTitle>
        </DialogHeader>
        <ChatGroupForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
