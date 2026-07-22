import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
});

export default function SavingsGoals() {
  const { state } = useApp();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Savings Goals</h3>
        <Button variant="ghost" size="sm" className="text-xs text-cyan-400 hover:text-cyan-300">
          <Plus className="w-3 h-3 mr-1" /> New Goal
        </Button>
      </div>
      <div className="space-y-3">
        {state.savingsGoals.slice(0, 3).map((goal, i) => {
          const pct = Math.round((goal.saved / goal.target) * 100);
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{goal.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{goal.name}</p>
                    <p className="text-xs text-muted-foreground">{pct}% complete</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">{naira.format(goal.saved)}</span>
              </div>
              <Progress
                value={pct}
                className="h-1.5 bg-white/10"
                style={
                  {
                    "--progress-background": goal.color,
                  } as React.CSSProperties
                }
              />
              <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
                <span>Target: {naira.format(goal.target)}</span>
                <span>{new Date(goal.deadline).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}