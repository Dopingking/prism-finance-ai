import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
});

export default function TransactionList() {
  const { state } = useApp();
  const recent = state.transactions.slice(0, 5);

  const formatAmount = (amount: number) => naira.format(amount);

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
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent Transactions</h3>
        <Button variant="ghost" size="sm" className="text-xs text-cyan-400 hover:text-cyan-300">
          View All <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
      <div className="space-y-1">
        {recent.map((tx, i) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                tx.type === "credit" ? "bg-emerald-500/15" : "bg-red-500/15"
              }`}
            >
              {tx.merchantLogo}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{tx.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{tx.merchant}</span>
                <span>·</span>
                <span>{formatTime(tx.date)}</span>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-semibold ${
                  tx.type === "credit" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {tx.type === "credit" ? "+" : "-"}
                {formatAmount(tx.amount)}
              </p>
              {tx.status === "pending" && (
                <Badge variant="outline" className="text-[10px] px-1 py-0 border-amber-500/30 text-amber-400">
                  Pending
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}