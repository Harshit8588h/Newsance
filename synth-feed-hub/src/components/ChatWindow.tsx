import { X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI news assistant. I can help you discuss any news article, explain complex topics, or answer questions about current events. What would you like to know?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `That's a great question about "${inputMessage}". While I don't have access to real-time news data in this demo, I would typically analyze the latest information to provide you with accurate, up-to-date insights about this topic. In a full implementation, I'd be connected to live news APIs and could discuss specific articles, provide context, and help you understand complex news stories.`,
        sender: "ai", 
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col animate-fade-in">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">AI News Assistant</h1>
              <p className="text-sm text-muted-foreground">
                Discuss news • Ask questions • Get insights
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 animate-fade-in ${
                message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div className={`p-2 rounded-full ${
                message.sender === "ai" 
                  ? "bg-primary/10" 
                  : "bg-muted"
              }`}>
                {message.sender === "ai" ? (
                  <Bot className="h-4 w-4 text-primary" />
                ) : (
                  <User className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className={`flex-1 max-w-xs md:max-w-md lg:max-w-lg ${
                message.sender === "user" ? "text-right" : ""
              }`}>
                <div className={`rounded-lg px-4 py-2 ${
                  message.sender === "ai"
                    ? "bg-muted text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start space-x-3 animate-fade-in">
              <div className="p-2 rounded-full bg-primary/10">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-card p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex space-x-3">
            <Input
              placeholder="Ask about any news article or current event..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-6"
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
          
          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              "Explain the latest AI developments",
              "What's happening with climate change?", 
              "Summarize today's business news",
              "Tell me about recent scientific discoveries"
            ].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setInputMessage(suggestion);
                  setTimeout(handleSendMessage, 100);
                }}
                disabled={isTyping}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;