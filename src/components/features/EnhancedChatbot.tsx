'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  TrendingUp,
  Calculator,
  FileText,
  Package,
  Bot,
  User,
  Mic,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
  type?: 'text' | 'quick-action' | 'data-viz';
  data?: any;
}

const initialBotMessage: Message = {
  id: '1',
  text: "👋 Hello! I'm your ErgoPack India assistant. I can help you calculate ROI, compare products, configure solutions, or answer technical questions. What brings you here today?",
  sender: 'bot',
  timestamp: new Date(),
  suggestions: [
    '💰 Calculate my ROI',
    '📊 Compare products',
    '🎯 Industry solutions',
    '📞 Talk to an expert',
  ],
};

const predictiveResponses: Record<string, { text: string; suggestions?: string[]; type?: string; data?: any }> = {
  roi: {
    text: "I'd be happy to help you calculate your potential ROI! Based on typical scenarios, companies save an average of $127,000 annually. Let me ask you a few questions to get precise numbers for your operation.",
    suggestions: [
      'I process 100-500 loads/month',
      'I process 500-1000 loads/month',
      'I process 1000+ loads/month',
      'Just show me an estimate',
    ],
    type: 'quick-action',
  },
  compare: {
    text: "Great! I can help you compare our product lines. The X-pert Line offers 99.99% reliability with IoT monitoring, while the Economy Line provides proven performance at a lower cost. What matters most to you?",
    suggestions: [
      'Maximum reliability (X-pert)',
      'Best value (Economy)',
      'Show me a detailed comparison',
      'I need both capabilities',
    ],
  },
  pharma: {
    text: "For pharmaceutical operations, compliance isn't optional—it's critical. Our cGMP-compliant solutions prevent pilferage, tampering, and regulatory failures. We've helped companies reduce compliance violations by 100%. What's your biggest concern?",
    suggestions: [
      'FDA compliance',
      'Chain of custody verification',
      'Tamper-evidence',
      'All of the above',
    ],
  },
  auto: {
    text: "Automotive JIT logistics demand zero-failure performance. A single failed load can halt an entire assembly line costing $22,000/minute. Our X-pert Line has maintained 99.99% uptime for Fortune 500 automotive manufacturers. Interested in the details?",
    suggestions: [
      'Tell me about uptime guarantees',
      'Show me automotive case studies',
      'Calculate downtime risk reduction',
      'Request a demo',
    ],
  },
  electronics: {
    text: "High-value electronics require precision tension control. Too much damages components, too little risks transit failure. Our ChainLance system maintains consistent tension within ±0.5% across all load conditions. Which is your priority?",
    suggestions: [
      'Preventing product damage',
      'Transit security',
      'Insurance cost reduction',
      'All three',
    ],
  },
  pricing: {
    text: "Investment in load security pays for itself quickly. X-pert Line starts at $35,000 with typical ROI in 2.3 months. Economy Line starts at $15,000 with ROI in 4.1 months. Most customers save 3-5x their investment in year one. What would you like to explore?",
    suggestions: [
      'Calculate exact ROI for my operation',
      'Compare total cost of ownership',
      'Financing options',
      'Request detailed quote',
    ],
  },
  technical: {
    text: "I can provide detailed technical specifications. The X-pert Line delivers up to 4500N tension force with ±0.5% precision, Siemens PLC control, and real-time IoT monitoring. What specific specs do you need?",
    suggestions: [
      'Tension specifications',
      'Control system details',
      'IoT/connectivity',
      'Dimensions & requirements',
    ],
  },
  consultation: {
    text: "Excellent! Our C-Suite Risk Assessment is typically a 45-minute confidential briefing where we analyze your specific failure risks and quantify potential savings. Available times are usually within 48 hours. Shall I help you schedule?",
    suggestions: [
      'Yes, schedule a consultation',
      'Tell me what to expect',
      'Send me information first',
      'I need internal approval first',
    ],
  },
  default: {
    text: "I'm here to help! I can assist with: calculating ROI, comparing products, industry-specific solutions, technical specifications, or scheduling a consultation. I can also answer questions about pricing, implementation, or specific features. What would be most valuable to you right now?",
    suggestions: [
      '💰 ROI Calculator',
      '📊 Product Comparison',
      '🏭 Industry Solutions',
      '📞 Expert Consultation',
    ],
  },
};

export default function EnhancedChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userPreferences, setUserPreferences] = useState<any>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getSmartResponse = (userMessage: string): typeof predictiveResponses.default => {
    const lowerMessage = userMessage.toLowerCase();

    // ROI related
    if (lowerMessage.includes('roi') || lowerMessage.includes('save') || lowerMessage.includes('cost') || lowerMessage.includes('investment')) {
      return predictiveResponses.roi;
    }

    // Comparison
    if (lowerMessage.includes('compare') || lowerMessage.includes('difference') || lowerMessage.includes('vs') || lowerMessage.includes('which')) {
      return predictiveResponses.compare;
    }

    // Industry specific
    if (lowerMessage.includes('pharma') || lowerMessage.includes('pharmaceutical') || lowerMessage.includes('compliance') || lowerMessage.includes('fda')) {
      return predictiveResponses.pharma;
    }

    if (lowerMessage.includes('automotive') || lowerMessage.includes('jit') || lowerMessage.includes('assembly')) {
      return predictiveResponses.auto;
    }

    if (lowerMessage.includes('electronics') || lowerMessage.includes('component') || lowerMessage.includes('precision')) {
      return predictiveResponses.electronics;
    }

    // Pricing
    if (lowerMessage.includes('price') || lowerMessage.includes('pricing') || lowerMessage.includes('how much') || lowerMessage.includes('cost')) {
      return predictiveResponses.pricing;
    }

    // Technical
    if (lowerMessage.includes('spec') || lowerMessage.includes('technical') || lowerMessage.includes('tension') || lowerMessage.includes('force')) {
      return predictiveResponses.technical;
    }

    // Consultation
    if (lowerMessage.includes('consult') || lowerMessage.includes('demo') || lowerMessage.includes('talk') || lowerMessage.includes('speak') || lowerMessage.includes('call')) {
      return predictiveResponses.consultation;
    }

    return predictiveResponses.default;
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

    // Simulate AI processing time
    setTimeout(() => {
      const response = getSmartResponse(text);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: response.suggestions,
        type: response.type as any,
        data: response.data,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-all group"
            aria-label="Open AI chat"
          >
            <MessageCircle className="w-9 h-9 group-hover:scale-110 transition-transform" />
            <motion.span
              className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Sparkles className="w-3 h-3" />
            </motion.span>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              AI Assistant
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-8 right-8 z-50 w-[440px] h-[680px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-5 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Bot className="w-7 h-7 text-red-600" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    AI Assistant
                    <Sparkles className="w-4 h-4" />
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-xs text-white/90">Online • Instant response</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'flex gap-3',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}

                  <div className="flex flex-col gap-2 max-w-[75%]">
                    <div
                      className={cn(
                        'rounded-2xl p-4 shadow-lg',
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white rounded-tr-none'
                          : 'bg-white text-gray-900 rounded-tl-none border border-gray-200'
                      )}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs mt-2 opacity-60">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && message.sender === 'bot' && (
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, i) => (
                          <motion.button
                            key={i}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs px-4 py-2 bg-white hover:bg-red-500 hover:text-white border border-gray-300 hover:border-red-500 text-gray-700 rounded-full transition-all shadow-sm hover:shadow-lg group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {/* Feedback buttons for bot messages */}
                    {message.sender === 'bot' && index > 0 && (
                      <div className="flex gap-2">
                        <button className="text-slate-500 hover:text-green-400 transition-colors p-1">
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button className="text-slate-500 hover:text-red-400 transition-colors p-1">
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 shadow-lg">
                    <div className="flex space-x-2">
                      {[0, 150, 300].map((delay, i) => (
                        <motion.div
                          key={i}
                          className="w-2.5 h-2.5 bg-red-500 rounded-full"
                          animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: delay / 1000,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-white border-t border-gray-200 p-3">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: Calculator, label: 'ROI', action: '💰 Calculate my ROI' },
                  { icon: Package, label: 'Compare', action: '📊 Compare products' },
                  { icon: TrendingUp, label: 'Solutions', action: '🎯 Industry solutions' },
                  { icon: FileText, label: 'Quote', action: 'Get a quote' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => sendMessage(item.action)}
                    className="flex flex-col items-center gap-1 p-2 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors group"
                  >
                    <item.icon className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors" />
                    <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-end gap-2"
              >
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Ask me anything..."
                    rows={1}
                    className="w-full px-4 py-3 pr-24 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none text-sm"
                  />
                  <div className="absolute right-2 bottom-2 flex gap-1">
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Attach file"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Voice input"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <motion.button
                  type="submit"
                  disabled={!input.trim()}
                  className="p-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-200 disabled:to-gray-200 disabled:text-gray-400 text-white rounded-xl transition-all shadow-lg disabled:shadow-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by AI • Instant responses • Human handoff available
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
