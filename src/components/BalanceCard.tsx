import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
});

export default function BalanceCard() {
  const { state } = useApp();
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount: number) => {
    if (state.currency === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(amount / 1550);
    }
    return naira.format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 border border-white/10"
    >
      {/* Background glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Total Balance</span>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            {showBalance ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
          </button>
        </div>

        <div className="mb-6">
          {showBalance ? (
            <motion.h1
              key={state.balance}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold tracking-tight"
            >
              {formatCurrency(state.balance)}
            </motion.h1>
          ) : (
            <div className="flex gap-2 items-center">
              <span className="text-4xl font-bold">••••••</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Income</p>
              <p className="text-sm font-semibold text-emerald-400">
                {formatCurrency(state.income)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-red-500/20">
              <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Expenses</p>
              <p className="text-sm font-semibold text-red-400">
                {formatCurrency(state.expenses)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 shadow-lg shadow-cyan-500/25">
            <Plus className="w-4 h-4 mr-1" /> Add Money
          </Button>
          <Button size="sm" variant="outline" className="border-white/20 text-foreground hover:bg-white/10">
            <ArrowUpRight className="w-4 h-4 mr-1" /> Transfer
          </Button>
        </div>
      </div>
    </motion.div>
  );
}