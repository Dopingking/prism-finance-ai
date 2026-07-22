import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CreditCard,
  ArrowRightLeft,
  PiggyBank,
  TrendingUp,
  Settings,
  Bell,
  Bot,
  CircleUser,
  HelpCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { BRAND_NAME } from "@/constants";
import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: ArrowRightLeft, label: "Transactions", id: "transactions" },
  { icon: CreditCard, label: "Cards", id: "cards" },
  { icon: PiggyBank, label: "Savings", id: "savings" },
  { icon: TrendingUp, label: "Investments", id: "investments" },
  { icon: Bell, label: "Notifications", id: "notifications" },
];

const bottomItems = [
  { icon: Bot, label: "AI Assistant", id: "ai" },
  { icon: Settings, label: "Settings", id: "settings" },
  { icon: HelpCircle, label: "Help", id: "help" },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setShowAI: (show: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, setShowAI }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { state } = useApp();
  const unreadCount = state.notifications.filter((n) => !n.read).length;

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      className="h-screen sticky top-0 z-50 flex flex-col border-r border-border/50 bg-sidebar/80 backdrop-blur-xl overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 shrink-0 border-b border-border/30">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-semibold text-lg tracking-tight"
            >
              {BRAND_NAME}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isNotif = item.id === "notifications";
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id === "notifications") setShowAI(false);
              }}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-300 shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-sm font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isNotif && unreadCount > 0 && (
                <Badge
                  variant="default"
                  className="ml-auto bg-cyan-500/20 text-cyan-300 border-0 text-xs px-1.5 py-0"
                >
                  {unreadCount}
                </Badge>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl border border-cyan-500/20"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Items */}
      <div className="px-2 py-4 space-y-1 border-t border-border/30">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "ai") {
                  setShowAI(true);
                  setActiveTab("dashboard");
                } else {
                  setActiveTab(item.id);
                }
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
            >
              <Icon className="w-5 h-5 shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-sm font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}

        {/* User */}
        <div className="flex items-center gap-3 px-3 py-3 mt-2 rounded-xl bg-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
            {state.user.firstName[0]}{state.user.lastName[0]}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium truncate">
                  {state.user.firstName} {state.user.lastName}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{state.user.tier}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Collapse */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-3 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </motion.aside>
  );
}