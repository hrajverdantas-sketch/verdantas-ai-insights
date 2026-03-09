import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockInvoices = [
  { id: "INV-001", orderGuid: "ORD-8a3f-4b2c", amount: 2450.00, date: "2024-12-02" },
  { id: "INV-002", orderGuid: "ORD-9c1d-7e5a", amount: 1875.50, date: "2024-12-04" },
  { id: "INV-003", orderGuid: "ORD-2b4e-1f8c", amount: 3200.00, date: "2024-12-06" },
  { id: "INV-004", orderGuid: "ORD-6e8h-2c4d", amount: 950.00, date: "2024-12-10" },
  { id: "INV-005", orderGuid: "ORD-7f9i-5d6e", amount: 4100.75, date: "2024-12-11" },
];

export default function InvoicesPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Invoices</h1>
        <p className="text-sm text-muted-foreground mt-1">View and download invoices for your orders</p>
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
                <th className="text-left p-4 font-medium text-muted-foreground">Invoice ID</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Order GUID</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Amount</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Download</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map((inv, i) => (
                <motion.tr
                  key={inv.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4 font-mono text-xs text-primary font-medium">{inv.id}</td>
                  <td className="p-4 font-mono text-xs text-muted-foreground hidden sm:table-cell">{inv.orderGuid}</td>
                  <td className="p-4 font-semibold text-foreground">${inv.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  <td className="p-4 text-muted-foreground hidden sm:table-cell">{inv.date}</td>
                  <td className="p-4 text-right">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Download className="w-3 h-3 mr-1" /> PDF
                    </Button>
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
