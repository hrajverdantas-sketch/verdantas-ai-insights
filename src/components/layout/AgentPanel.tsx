import { motion, AnimatePresence } from "framer-motion";
import { X, Bot, FileSearch, AlertTriangle, FileText, BookOpen, Lightbulb, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const quickActions = [
  { label: "Summarize Report", icon: FileText },
  { label: "Check Report Gaps", icon: AlertTriangle },
  { label: "Draft Narrative", icon: FileSearch },
  { label: "Explain Terms", icon: BookOpen },
  { label: "Extract Findings", icon: Lightbulb },
];

interface AgentPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function AgentPanel({ open, onClose }: AgentPanelProps) {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  return (
    <>
      {/* Desktop panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="hidden md:flex flex-col border-l border-border bg-card overflow-hidden flex-shrink-0"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center animate-pulse-glow">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-foreground">AI Agent</h3>
                  <p className="text-xs text-muted-foreground">Environmental Assistant</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-3 border-b border-border">
              <p className="text-xs font-medium text-muted-foreground mb-2">Quick Actions</p>
              <div className="flex flex-wrap gap-1.5">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => setActiveAction(action.label)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                      activeAction === action.label
                        ? "gradient-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }`}
                  >
                    <action.icon className="w-3 h-3" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Copilot Studio iframe placeholder */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 animate-pulse-glow">
                <Bot className="w-8 h-8 text-primary-foreground" />
              </div>
              <p className="text-sm font-heading font-semibold text-foreground mb-1">Copilot Agent Ready</p>
              <p className="text-xs text-muted-foreground mb-4 max-w-[200px]">
                Embed your Copilot Studio agent iframe here for report analysis and environmental assistance.
              </p>
              {/* 
                Replace the div below with:
                <iframe src="YOUR_COPILOT_STUDIO_URL" className="w-full flex-1 border-0" />
              */}
              <div className="w-full h-48 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Copilot Studio Iframe</span>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile floating bubble */}
      {!open && (
        <button
          onClick={() => onClose()}
          className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary shadow-elevated flex items-center justify-center animate-pulse-glow"
        >
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        </button>
      )}
    </>
  );
}
