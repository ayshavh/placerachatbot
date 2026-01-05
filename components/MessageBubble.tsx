
import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  // Helper to render text with clickable links
  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-indigo-200 hover:text-white transition-colors"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const renderBotTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-indigo-600 hover:text-indigo-800 transition-colors break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
          isBot
            ? 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
            : 'bg-indigo-600 text-white rounded-br-none'
        }`}
      >
        {message.isLoading ? (
          <div className="flex space-x-1 items-center h-5">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {isBot ? renderBotTextWithLinks(message.text) : renderTextWithLinks(message.text)}
          </div>
        )}
      </div>
    </div>
  );
};
