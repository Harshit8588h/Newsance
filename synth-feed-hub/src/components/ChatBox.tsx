import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ChatBoxProps {
  onOpenChat: () => void;
}

const ChatBox = ({ onOpenChat }: ChatBoxProps) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // For now, just open the full chat
      onOpenChat();
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isMinimized ? (
        // Minimized Chat Button
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 animate-scale-in"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        // Expanded Chat Preview
        <Card className="w-80 animate-slide-up shadow-xl">
          <div className="p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Chat with AI</h3>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onOpenChat}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M8 21H5C3.89543 21 3 20.1046 3 19V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(true)}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Sample Messages */}
            <div className="space-y-2 max-h-32 overflow-y-auto">
              <div className="text-sm bg-muted rounded-lg p-2">
                <p className="text-muted-foreground">Hello! I can help you discuss any news article or answer questions about current events. What would you like to talk about?</p>
              </div>
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about any news..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                size="icon"
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setMessage("Explain the latest AI news");
                  handleSendMessage();
                }}
              >
                Explain AI news
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setMessage("Summarize today's headlines");
                  handleSendMessage();
                }}
              >
                Summarize headlines
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ChatBox;