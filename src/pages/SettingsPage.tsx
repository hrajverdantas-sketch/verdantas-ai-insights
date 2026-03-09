import { motion } from "framer-motion";
import { User, Bell, Shield, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      {[
        { icon: User, title: "Profile", desc: "Update your personal information" },
        { icon: Bell, title: "Notifications", desc: "Configure email and push notifications" },
        { icon: Shield, title: "Security", desc: "Password and authentication settings" },
        { icon: Palette, title: "Appearance", desc: "Theme and display preferences" },
      ].map((section, i) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-card rounded-xl border border-border p-6 shadow-card"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <section.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">{section.title}</h3>
              <p className="text-xs text-muted-foreground">{section.desc}</p>
            </div>
          </div>
          {section.title === "Profile" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input placeholder="First Name" defaultValue="Demo" />
              <Input placeholder="Last Name" defaultValue="User" />
              <Input placeholder="Email" defaultValue="demo@verdantas.com" className="sm:col-span-2" />
              <div className="sm:col-span-2">
                <Button size="sm" className="gradient-primary text-primary-foreground">Save Changes</Button>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
