
import React, { useState, useEffect, useRef } from 'react';
import { Message, MenuLevel } from './types';
import { 
  MAIN_MENU_OPTIONS, 
  COMPANY_OPTIONS, 
  INTERVIEW_PREP_OPTIONS, 
  ELIGIBILITY_CRITERIA, 
  PLACEMENT_CELL_CONTACT, 
  PREP_TIPS 
} from './constants';
import { fetchCompanyDetails } from './geminiService';
import { MessageBubble } from './components/MessageBubble';
import { MenuButtons } from './components/MenuButtons';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<MenuLevel>(MenuLevel.MAIN);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  useEffect(() => {
    if (messages.length === 0) {
      addBotMessage('Welcome to the Placement Assistance and Support System. Please select an option from the menu.');
    }
  }, []);

  const addBotMessage = (text: string, options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'bot',
      text,
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const showMainMenu = () => {
    setCurrentMenu(MenuLevel.MAIN);
    addBotMessage('How can I assist you further? Please select an option from the main menu.');
  };

  const handleOptionSelect = async (option: string) => {
    if (isProcessing) return;

    addUserMessage(option);

    if (currentMenu === MenuLevel.MAIN) {
      if (option === 'Company Details') {
        setCurrentMenu(MenuLevel.COMPANY_SELECTION);
        addBotMessage('Please select a company to view details and specific eligibility requirements:');
      } else if (option === 'Eligibility Criteria') {
        setIsProcessing(true);
        setTimeout(() => {
          addBotMessage(ELIGIBILITY_CRITERIA);
          setIsProcessing(false);
          showMainMenu();
        }, 500);
      } else if (option === 'Interview Preparation') {
        setCurrentMenu(MenuLevel.INTERVIEW_PREP);
        addBotMessage('Select an area for preparation tips and samples:');
      } else if (option === 'Placement Cell Contact Details') {
        setIsProcessing(true);
        setTimeout(() => {
          addBotMessage(PLACEMENT_CELL_CONTACT);
          setIsProcessing(false);
          showMainMenu();
        }, 500);
      }
    } else if (currentMenu === MenuLevel.COMPANY_SELECTION) {
      setIsProcessing(true);
      const result = await fetchCompanyDetails(option);
      
      addBotMessage(result.text);
      setIsProcessing(false);
      showMainMenu();
    } else if (currentMenu === MenuLevel.INTERVIEW_PREP) {
      setIsProcessing(true);
      const tips = PREP_TIPS[option] || 'No information available for this topic.';
      setTimeout(() => {
        addBotMessage(tips);
        setIsProcessing(false);
        showMainMenu();
      }, 500);
    }
  };

  const getActiveOptions = () => {
    if (isProcessing) return [];
    switch (currentMenu) {
      case MenuLevel.MAIN:
        return MAIN_MENU_OPTIONS;
      case MenuLevel.COMPANY_SELECTION:
        return COMPANY_OPTIONS;
      case MenuLevel.INTERVIEW_PREP:
        return INTERVIEW_PREP_OPTIONS;
      default:
        return [];
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center shrink-0">
            <div>
              <h1 className="text-white font-semibold text-lg">Placement Assistant</h1>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                <span className="text-indigo-100 text-xs font-medium uppercase tracking-wider">Online Support</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white opacity-80 hover:opacity-100 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-grow overflow-y-auto px-4 py-6 bg-slate-50 relative scroll-smooth"
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isProcessing && (
              <MessageBubble message={{ id: 'loading', sender: 'bot', text: '', isLoading: true }} />
            )}
            <div ref={messagesEndRef} />

            {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="fixed bottom-[230px] right-10 z-10 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-all animate-bounce"
                title="Scroll to latest"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100 shrink-0">
            <div className="mb-2 text-[10px] uppercase font-bold text-gray-400 tracking-widest ml-1">
              {isProcessing ? 'Bot is thinking...' : 'Choose an option'}
            </div>
            <MenuButtons 
              options={getActiveOptions()} 
              onSelect={handleOptionSelect} 
              disabled={isProcessing}
            />
            <div className="mt-3 text-[10px] text-center text-gray-400 font-medium">
              Strictly menu-driven • Text input disabled
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-white text-indigo-600 rotate-90' : 'bg-indigo-600 text-white'
        }`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default App;
