import { motion } from "framer-motion";
import { Send, Receipt, Smartphone, TrendingUp, PiggyBank, ArrowDownRight } from "lucide-react";
import { mockQuickActions } from "@/data/mockData";

const iconMap: Record<string, React.ElementType> = {
  Send,
  Receipt,
  Smartphone,
  TrendingUp,
  PiggyBank,
  ArrowDownRight,
};

export default function QuickActions() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-2">
        {mockQuickActions.map((action, i) => {
          const Icon = iconMap[action.icon];
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${action.color}20` }}
              >
                {Icon && <Icon className="w-5 h-5" style={{ color: action.color }} />}
              </div>
              <span className="text-xs font-medium">{action.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}