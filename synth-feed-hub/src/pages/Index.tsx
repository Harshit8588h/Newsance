import TopBar from "@/components/TopBar";
import NewsFeed from "@/components/NewsFeed";
import ChatBox from "@/components/ChatBox";
import ChatWindow from "@/components/ChatWindow";
import { useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showChatWindow, setShowChatWindow] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <TopBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="pb-8">
        <NewsFeed searchQuery={searchQuery} />
      </main>

      {!showChatWindow && (
        <ChatBox onOpenChat={() => setShowChatWindow(true)} />
      )}

      {showChatWindow && (
        <ChatWindow onClose={() => setShowChatWindow(false)} />
      )}
    </div>
  );
};

export default Index;

