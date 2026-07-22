import { motion } from "framer-motion";
import { X, Check, Bell, AlertTriangle, Gift, CreditCard, Shield, Info } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const typeIcons: Record<string, React.ElementType> = {
  payment: CreditCard,
  alert: AlertTriangle,
  reminder: Bell,
  security: Shield,
  promo: Gift,
};

const typeColors: Record<string, string> = {
  payment: "bg-cyan-500/20 text-cyan-300",
  alert: "bg-amber-500/20 text-amber-300",
  reminder: "bg-emerald-500/20 text-emerald-300",
  security: "bg-violet-500/20 text-violet-300",
  promo: "bg-pink-500/20 text-pink-300",
};

export default function Notifications() {
  const { state, dispatch } = useApp();
  const unread = state.notifications.filter((n) => !n.read);

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(diff / 86400000);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Notifications</h3>
        {unread.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-cyan-400 hover:text-cyan-300"
            onClick={() => dispatch({ type: "MARK_ALL_NOTIFICATIONS_READ" })}
          >
            <Check className="w-3 h-3 mr-1" /> Mark All Read
          </Button>
        )}
      </div>

      <div className="space-y-1">
        {state.notifications.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications yet</p>
          </div>
        )}

        {state.notifications.map((notif, i) => {
          const Icon = typeIcons[notif.type] || Info;
          const colorClass = typeColors[notif.type] || "bg-white/10 text-muted-foreground";
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex gap-3 p-3 rounded-xl transition-colors ${
                !notif.read ? "bg-white/5 border border-white/10" : "hover:bg-white/5"
              }`}
              onClick={() => dispatch({ type: "MARK_NOTIFICATION_READ", payload: notif.id })}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">{notif.title}</p>
                  <span className="text-[10px] text-muted-foreground shrink-0">{formatTime(notif.timestamp)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                {notif.actionable && notif.actionLabel && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1.5 text-xs text-cyan-400 hover:text-cyan-300 h-6 px-2"
                  >
                    {notif.actionLabel}
                  </Button>
                )}
              </div>
              {!notif.read && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-2" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}