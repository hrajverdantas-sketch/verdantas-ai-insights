import { motion } from "framer-motion";
import { Eye, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const statusStyles: Record<string, string> = {
  OnSubmission: "bg-warning/15 text-warning",
  Processing: "bg-info/15 text-info",
  Shipped: "bg-success/15 text-success",
  Rejected: "bg-destructive/15 text-destructive",
};

const mockOrders = [
  { guid: "ORD-8a3f-4b2c", address: "1200 River Rd, Columbus, OH 43215", date: "2024-12-01", status: "Shipped" },
  { guid: "ORD-9c1d-7e5a", address: "450 Main St, Cleveland, OH 44114", date: "2024-12-03", status: "Processing" },
  { guid: "ORD-2b4e-1f8c", address: "780 Oak Ave, Cincinnati, OH 45202", date: "2024-12-05", status: "OnSubmission" },
  { guid: "ORD-5d7g-3a9b", address: "320 Lakeview Dr, Toledo, OH 43604", date: "2024-12-07", status: "Rejected" },
  { guid: "ORD-6e8h-2c4d", address: "90 Industrial Pkwy, Akron, OH 44308", date: "2024-12-09", status: "Processing" },
  { guid: "ORD-7f9i-5d6e", address: "2100 Commerce Blvd, Dayton, OH 45402", date: "2024-12-10", status: "Shipped" },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage and track your environmental report orders</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 font-medium text-muted-foreground">Order GUID</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Property Address</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order, i) => (
                <motion.tr
                  key={order.guid}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4 font-mono text-xs text-primary">{order.guid}</td>
                  <td className="p-4 text-foreground hidden md:table-cell">{order.address}</td>
                  <td className="p-4 text-muted-foreground hidden sm:table-cell">{order.date}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {order.status !== "Shipped" && order.status !== "Rejected" && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <XCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
