import { motion } from "framer-motion";
import { QrCode } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
});

export default function Cards() {
  const { state, dispatch } = useApp();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Cards</h3>
        <Button variant="ghost" size="sm" className="text-xs text-cyan-400 hover:text-cyan-300">
          <QrCode className="w-3 h-3 mr-1" /> Add Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {state.cards.map((card, i) => {
          const usagePct = Math.round((card.spendingUsed / card.spendingLimit) * 100);
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} p-5 border border-white/10`}
            >
              {/* Glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/5 rounded-full blur-2xl" />

              <div className="relative z-10">
                {/* Top */}
                <div className="flex items-center justify-between mb-6">
                  <Badge variant="outline" className="border-white/20 text-white/80 text-[10px] uppercase">
                    {card.type}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/60">Frozen</span>
                    <Switch
                      checked={!card.frozen}
                      onCheckedChange={() => dispatch({ type: "TOGGLE_CARD_FROZEN", payload: card.id })}
                      className="scale-75"
                    />
                  </div>
                </div>

                {/* Card Info */}
                <div className="mb-4">
                  <p className="text-lg font-mono tracking-wider text-white/90">{card.cardNumber}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-white/60">
                    <span>Expires {card.expiry}</span>
                    <span>CVV ***</span>
                  </div>
                </div>

                {/* Usage */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Spending Limit</span>
                    <span>{naira.format(card.spendingUsed)} / {naira.format(card.spendingLimit)}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-white/40 to-white/20"
                      style={{ width: `${usagePct}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}