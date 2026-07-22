import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Bot, Sparkles, Search } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/Sidebar";
import AIAssistant from "@/components/AIAssistant";
import Dashboard from "@/components/Dashboard";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAI, setShowAI] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} setShowAI={setShowAI} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 shrink-0 flex items-center justify-between px-4 lg:px-6 border-b border-border/30 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
          {/* Left: page title */}
          <div className="flex items-center gap-2">
            <motion.h1
              key={activeTab}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-semibold capitalize"
            >
              {activeTab === "dashboard" ? "Overview" : activeTab}
            </motion.h1>
            {activeTab === "dashboard" && (
              <Badge variant="outline" className="text-[10px] border-cyan-500/30 text-cyan-300 bg-cyan-500/5">
                <Sparkles className="w-3 h-3 mr-1" /> AI Powered
              </Badge>
            )}
          </div>

          {/* Right: search + actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions..."
                className="w-48 lg:w-64 h-9 pl-9 bg-white/5 border-white/10 text-sm rounded-xl"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => {
                setActiveTab("notifications");
                setShowAI(false);
              }}
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-cyan-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            <Button
              variant={showAI ? "default" : "ghost"}
              size="icon"
              onClick={() => setShowAI(!showAI)}
              className={showAI ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white" : ""}
            >
              <Bot className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <Dashboard activeTab={activeTab} setShowAI={setShowAI} />
      </div>

      {/* AI Assistant Panel */}
      <AIAssistant show={showAI} onClose={() => setShowAI(false)} />
    </div>
  );
}