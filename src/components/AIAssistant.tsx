import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AIAssistantProps {
  show: boolean;
  onClose: () => void;
}

export default function AIAssistant({ show, onClose }: AIAssistantProps) {
  const { state, dispatch } = useApp();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.aiMessages]);

  const handleSend = () => {
    if (!input.trim()) return;
    dispatch({
      type: "ADD_AI_MESSAGE",
      payload: {
        id: `ai_${Date.now()}`,
        role: "user",
        content: input,
        timestamp: new Date().toISOString(),
      },
    });
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      dispatch({
        type: "ADD_AI_MESSAGE",
        payload: {
          id: `ai_${Date.now() + 1}`,
          role: "assistant",
          content:
            "I've analyzed your recent activity. Your spending is within normal range this week. Would you like me to suggest ways to optimize your budget?",
          timestamp: new Date().toISOString(),
          suggestions: ["Show budget breakdown", "Suggest savings tips", "Analyze investments"],
        },
      });
    }, 1000);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 h-full w-96 z-50 flex flex-col bg-card/95 backdrop-blur-xl border-l border-border/50 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-border/30 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">LUMA AI</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea ref={scrollRef} className="flex-1 p-4">
            <div className="space-y-4">
              {state.aiMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-blue-600 text-white text-xs">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                        : "bg-white/5 border border-white/10"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    {msg.suggestions && (
                      <div className="mt-2 space-y-1">
                        {msg.suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              dispatch({
                                type: "ADD_AI_MESSAGE",
                                payload: {
                                  id: `ai_${Date.now()}`,
                                  role: "user",
                                  content: s,
                                  timestamp: new Date().toISOString(),
                                },
                              });
                            }}
                            className="flex items-center gap-1 text-xs text-cyan-300 hover:text-cyan-200 transition-colors"
                          >
                            <ArrowRight className="w-3 h-3" /> {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border/30 shrink-0">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask LUMA AI anything..."
                className="bg-white/5 border-white/10 text-sm"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}