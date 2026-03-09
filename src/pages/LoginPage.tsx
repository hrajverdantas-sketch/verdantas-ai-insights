import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Lock, User, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(username, password)) {
      setError("Invalid credentials. Try demo / verdantas123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero relative overflow-hidden">
      {/* Subtle background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-card rounded-2xl shadow-elevated p-8 border border-border">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Verdantas</h1>
          </div>

          <p className="text-center text-muted-foreground mb-6 text-sm">
            Environmental Report Management Portal
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-destructive text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold h-11">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-xs text-center text-muted-foreground">
            Demo credentials: demo / verdantas123
          </p>
        </div>
      </motion.div>
    </div>
  );
}
