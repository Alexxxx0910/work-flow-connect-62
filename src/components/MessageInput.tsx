
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizonal, PaperclipIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={cn(
      "border-t bg-background p-2 flex items-end space-x-2",
      disabled && "opacity-50"
    )}>
      <Button 
        variant="ghost" 
        size="icon" 
        className="flex-shrink-0" 
        disabled={disabled}
      >
        <PaperclipIcon className="h-5 w-5" />
      </Button>

      <textarea
        ref={textareaRef}
        className={cn(
          "flex-1 min-h-[40px] max-h-[120px] px-3 py-2 rounded-md border resize-none focus:outline-none focus:ring-1 focus:ring-wfc-purple",
          disabled && "cursor-not-allowed"
        )}
        placeholder="Escribe un mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
      />

      <Button 
        variant="ghost" 
        size="icon" 
        className={cn(
          "flex-shrink-0 rounded-full bg-wfc-purple text-white hover:bg-wfc-purple-medium",
          !message.trim() && "opacity-50 cursor-not-allowed"
        )}
        onClick={handleSend}
        disabled={!message.trim() || disabled}
      >
        <SendHorizonal className="h-5 w-5" />
      </Button>
    </div>
  );
};
