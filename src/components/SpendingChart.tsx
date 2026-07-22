import { useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { ChartLine, ChartNoAxesColumn } from "lucide-react";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
});

export default function SpendingChart() {
  const { state } = useApp();

  const categoryData = useMemo(() => {
    const map = new Map<string, number>();
    state.transactions
      .filter((t) => t.type === "debit")
      .forEach((t) => {
        map.set(t.category, (map.get(t.category) || 0) + t.amount);
      });
    const total = Array.from(map.values()).reduce((a, b) => a + b, 0);
    return Array.from(map.entries())
      .map(([name, amount]) => ({ name, amount, pct: Math.round((amount / total) * 100) }))
      .sort((a, b) => b.amount - a.amount);
  }, [state.transactions]);

  const colors = [
    "from-cyan-400 to-blue-500",
    "from-emerald-400 to-teal-500",
    "from-violet-400 to-purple-500",
    "from-amber-400 to-orange-500",
    "from-rose-400 to-pink-500",
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Spending Breakdown</h3>
        <ChartNoAxesColumn className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className="space-y-2">
        {categoryData.slice(0, 5).map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="space-y-1"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{cat.name}</span>
              <span className="text-muted-foreground">{naira.format(cat.amount)}</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${cat.pct}%` }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className={`h-full rounded-full bg-gradient-to-r ${colors[i % colors.length]}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}