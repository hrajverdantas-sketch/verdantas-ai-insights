import { Leaf, Menu, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface TopNavProps {
  onToggleSidebar: () => void;
  onToggleAgent: () => void;
  agentOpen: boolean;
}

export default function TopNav({ onToggleSidebar, onToggleAgent, agentOpen }: TopNavProps) {
  const { logout, user } = useAuth();

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-lg text-foreground hidden sm:block">Verdantas</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
        </Button>

        <Button
          variant={agentOpen ? "default" : "outline"}
          size="sm"
          onClick={onToggleAgent}
          className={agentOpen ? "gradient-primary text-primary-foreground" : ""}
        >
          <span className="hidden sm:inline">AI Agent</span>
          <span className="sm:hidden">AI</span>
        </Button>

        <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-border">
          <span className="text-sm text-muted-foreground">{user?.username}</span>
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
