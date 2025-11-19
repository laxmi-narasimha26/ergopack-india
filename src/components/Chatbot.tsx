'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import Button from './ui/Button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialBotMessage: Message = {
  id: '1',
  text: "Hello! I'm the ErgoPack assistant. I can help you with information about our products, industries we serve, or schedule a consultation. How can I assist you today?",
  sender: 'bot',
  timestamp: new Date(),
};

const quickReplies = [
  'Tell me about X-pert Line',
  'Compare products',
  'Industry solutions',
  'Request consultation',
];

const botResponses: Record<string, string> = {
  'xpert': "The X-pert Line is our flagship intelligent risk-mitigation system featuring a Siemens Industrial Touchscreen, Triplex-Tool-Lift, and precision line-laser guidance. It delivers up to 4500N tension force for absolute load security. Would you like to know more about specific features?",
  'economy': "The E-conomy Line is our proven, reliable workhorse that's been the benchmark in pallet strapping for almost 20 years. It offers electronically controlled drive and integrated sealing head with consistent performance. Perfect for standard logistics operations.",
  'compare': "Great question! The X-pert Line offers advanced automation with a Siemens touchscreen and higher tension force (up to 4500N), while the E-conomy Line provides reliable, proven performance at a lower investment. Would you like to see a detailed comparison?",
  'pharma': "For pharmaceutical and life sciences, we provide cGMP-compliant solutions that mitigate risks of pilferage, tampering, and regulatory non-compliance with verifiable, consistent seals to protect product integrity from factory to patient.",
  'automotive': "Our automotive solutions ensure zero-failure standard for Just-in-Time logistics. With up to 4500N tension and German-engineered reliability, we prevent assembly line stoppages from failed pallets.",
  'electronics': "For electronics and high-value machinery, we offer precision tension control that eliminates the inconsistency of manual strapping - preventing both damage from excessive tension and failure from insufficient tension.",
  'consultation': "I'd be happy to help schedule a C-Suite Risk Assessment consultation. Please visit our Contact page to request an exclusive invitation, or I can transfer you there now. Would you like me to do that?",
  'default': "I can help you with information about our products (X-pert Line, E-conomy Line), industry solutions (Pharmaceuticals, Automotive, Electronics), or schedule a consultation. What would you like to know more about?",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('xpert') || lowerMessage.includes('x-pert')) {
      return botResponses.xpert;
    } else if (lowerMessage.includes('economy') || lowerMessage.includes('e-conomy')) {
      return botResponses.economy;
    } else if (lowerMessage.includes('compare') || lowerMessage.includes('difference')) {
      return botResponses.compare;
    } else if (lowerMessage.includes('pharma') || lowerMessage.includes('pharmaceutical')) {
      return botResponses.pharma;
    } else if (lowerMessage.includes('automotive') || lowerMessage.includes('auto')) {
      return botResponses.automotive;
    } else if (lowerMessage.includes('electronics') || lowerMessage.includes('electronic')) {
      return botResponses.electronics;
    } else if (lowerMessage.includes('consult') || lowerMessage.includes('demo') || lowerMessage.includes('contact')) {
      return botResponses.consultation;
    }

    return botResponses.default;
  };

  const sendMessage = (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-accent-600 hover:bg-accent-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-colors"
            aria-label="Open chat"
          >
            <MessageCircle className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 w-96 h-[600px] bg-dark-900 border border-dark-700 rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-accent-600 to-accent-700 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">ErgoPack Assistant</h3>
                  <p className="text-xs text-white/80">Online now</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1 rounded transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-950">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'flex',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg p-3',
                      message.sender === 'user'
                        ? 'bg-accent-600 text-white'
                        : 'bg-dark-800 text-dark-100'
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-60">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-dark-800 text-dark-100 rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="p-3 bg-dark-900 border-t border-dark-800">
                <p className="text-xs text-dark-400 mb-2">Quick replies:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs px-3 py-1.5 bg-dark-800 hover:bg-dark-700 text-dark-200 rounded-full transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-dark-900 border-t border-dark-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex space-x-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:border-accent-600 focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="px-4 py-2 bg-accent-600 hover:bg-accent-700 disabled:bg-dark-800 disabled:text-dark-500 text-white rounded-lg transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
