import { ShoppingCart, FileText, Clock, Loader2 } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import GlobeScene from "@/components/dashboard/GlobeScene";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const stats = [
  { title: "Total Orders", value: 1284, change: "+12% this month", icon: ShoppingCart },
  { title: "Reports Retrieved", value: 856, change: "+8% this month", icon: FileText },
  { title: "Pending Orders", value: 43, change: "5 urgent", icon: Clock },
  { title: "Processing", value: 18, change: "ETA ~2hrs", icon: Loader2 },
];

const monthlyData = [
  { month: "Jan", orders: 85 },
  { month: "Feb", orders: 102 },
  { month: "Mar", orders: 98 },
  { month: "Apr", orders: 120 },
  { month: "May", orders: 145 },
  { month: "Jun", orders: 132 },
];

const statusData = [
  { name: "Shipped", value: 540, color: "hsl(162, 63%, 30%)" },
  { name: "Processing", value: 180, color: "hsl(200, 80%, 50%)" },
  { name: "On Submission", value: 95, color: "hsl(38, 92%, 50%)" },
  { name: "Rejected", value: 25, color: "hsl(0, 72%, 51%)" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <GlobeScene />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatsCard key={stat.title} {...stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl border border-border p-5 shadow-card"
        >
          <h3 className="font-heading font-semibold text-foreground mb-4">Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(210, 10%, 45%)" />
              <Tooltip />
              <Bar dataKey="orders" fill="hsl(162, 63%, 24%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-xl border border-border p-5 shadow-card"
        >
          <h3 className="font-heading font-semibold text-foreground mb-4">Order Status Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
