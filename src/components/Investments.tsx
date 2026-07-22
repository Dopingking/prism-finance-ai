import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { ChartPie } from "lucide-react";

export default function Investments() {
  const { state } = useApp();

  const formatUSD = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);

  const totalValue = state.investments.reduce(
    (sum, inv) => sum + inv.shares * inv.currentPrice,
    0
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Investment Portfolio</h3>
        <Button variant="ghost" size="sm" className="text-xs text-cyan-400 hover:text-cyan-300">
          <ChartPie className="w-3 h-3 mr-1" /> Rebalance
        </Button>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/5 to-blue-500/10 border border-cyan-500/10">
        <p className="text-xs text-muted-foreground">Portfolio Value</p>
        <p className="text-2xl font-bold">{formatUSD(totalValue)}</p>
      </div>

      <div className="space-y-1">
        {state.investments.map((inv, i) => {
          const profit = (inv.currentPrice - inv.buyPrice) * inv.shares;
          const isUp = inv.change24h >= 0;
          return (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg">
                {inv.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{inv.name}</p>
                  <span className="text-[10px] text-muted-foreground bg-white/10 px-1.5 rounded">{inv.symbol}</span>
                </div>
                <p className="text-xs text-muted-foreground">{inv.shares} shares · {inv.allocation}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{formatUSD(inv.shares * inv.currentPrice)}</p>
                <div className="flex items-center gap-1 justify-end">
                  {isUp ? (
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  )}
                  <span className={`text-xs ${isUp ? "text-emerald-400" : "text-red-400"}`}>
                    {isUp ? "+" : ""}
                    {inv.change24h}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}