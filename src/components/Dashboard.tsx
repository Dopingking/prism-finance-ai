import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Lightbulb, TrendingUp, Shield } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BalanceCard from "@/components/BalanceCard";
import QuickActions from "@/components/QuickActions";
import TransactionList from "@/components/TransactionList";
import SavingsGoals from "@/components/SavingsGoals";
import Investments from "@/components/Investments";
import SpendingChart from "@/components/SpendingChart";
import Cards from "@/components/Cards";
import Notifications from "@/components/Notifications";

const insightIcons: Record<string, React.ElementType> = {
  insight: Lightbulb,
  suggestion: TrendingUp,
  alert: Shield,
  tip: Sparkles,
};

const insightColors: Record<string, string> = {
  insight: "from-cyan-400 to-blue-500",
  suggestion: "from-emerald-400 to-teal-500",
  alert: "from-amber-400 to-orange-500",
  tip: "from-violet-400 to-purple-500",
};

interface DashboardProps {
  activeTab: string;
  setShowAI: (show: boolean) => void;
}

export default function Dashboard({ activeTab, setShowAI }: DashboardProps) {
  const { state } = useApp();

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Balance + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <BalanceCard />
              </div>
              <div>
                <QuickActions />
              </div>
            </div>

            {/* AI Advice */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">AI Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {state.aiAdvice.slice(0, 4).map((advice, i) => {
                  const Icon = insightIcons[advice.type] || Sparkles;
                  const color = insightColors[advice.type] || "from-cyan-400 to-blue-500";
                  return (
                    <motion.div
                      key={advice.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-2`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-sm font-medium mb-1">{advice.title}</p>
                      <p className="text-xs text-muted-foreground mb-2">{advice.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-[10px] text-cyan-300 border-cyan-500/30">
                          {advice.impact}
                        </Badge>
                        <button
                          onClick={() => setShowAI(true)}
                          className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                        >
                          {advice.action} <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Credit Score", value: state.creditScore, change: "+12", color: "from-cyan-400 to-blue-500", icon: Sparkles },
                { label: "Total Savings", value: "₦" + (state.savings / 1000000).toFixed(1) + "M", change: "+8.2%", color: "from-emerald-400 to-teal-500", icon: Shield },
                { label: "Investments", value: "$" + (state.investmentValue / 1000).toFixed(0) + "K", change: "+3.1%", color: "from-violet-400 to-purple-500", icon: TrendingUp },
                { label: "Monthly Budget", value: "₦1.2M", change: "68% used", color: "from-amber-400 to-orange-500", icon: Lightbulb },
              ].map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                      <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <StatIcon className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-xs text-emerald-400">{stat.change}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Transactions + Spending */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TransactionList />
              <SpendingChart />
            </div>

            {/* Savings + Investments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SavingsGoals />
              <Investments />
            </div>
          </div>
        );
      case "transactions":
        return (
          <div className="max-w-2xl mx-auto">
            <TransactionList />
          </div>
        );
      case "cards":
        return <Cards />;
      case "savings":
        return <SavingsGoals />;
      case "investments":
        return <Investments />;
      case "notifications":
        return <Notifications />;
      default:
        return (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">Coming soon</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {renderTabContent()}
      </div>
    </div>
  );
}