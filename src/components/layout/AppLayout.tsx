import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";
import AppSidebar from "./AppSidebar";
import AgentPanel from "./AgentPanel";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onToggleAgent={() => setAgentOpen(!agentOpen)}
        agentOpen={agentOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
        <AgentPanel open={agentOpen} onClose={() => setAgentOpen(!agentOpen)} />
      </div>
    </div>
  );
}
