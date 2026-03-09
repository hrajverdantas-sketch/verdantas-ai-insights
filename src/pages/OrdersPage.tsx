import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, XCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const statusStyles: Record<string, string> = {
  OnSubmission: "bg-warning/15 text-warning",
  Processing: "bg-info/15 text-info",
  Shipped: "bg-success/15 text-success",
  Rejected: "bg-destructive/15 text-destructive",
};

interface Order {
  guid: string;
  address: string;
  date: string;
  status: string;
  reportType?: string;
  clientName?: string;
}

const initialOrders: Order[] = [
  { guid: "ORD-8a3f-4b2c", address: "1200 River Rd, Columbus, OH 43215", date: "2024-12-01", status: "Shipped", reportType: "Phase I ESA", clientName: "Riverside Dev Corp" },
  { guid: "ORD-9c1d-7e5a", address: "450 Main St, Cleveland, OH 44114", date: "2024-12-03", status: "Processing", reportType: "Phase II ESA", clientName: "Great Lakes Holdings" },
  { guid: "ORD-2b4e-1f8c", address: "780 Oak Ave, Cincinnati, OH 45202", date: "2024-12-05", status: "OnSubmission", reportType: "Transaction Screen", clientName: "Midwest Realty" },
  { guid: "ORD-5d7g-3a9b", address: "320 Lakeview Dr, Toledo, OH 43604", date: "2024-12-07", status: "Rejected", reportType: "Environmental Compliance", clientName: "Toledo Mfg" },
  { guid: "ORD-6e8h-2c4d", address: "90 Industrial Pkwy, Akron, OH 44308", date: "2024-12-09", status: "Processing", reportType: "Wetland Delineation", clientName: "Summit Properties" },
  { guid: "ORD-7f9i-5d6e", address: "2100 Commerce Blvd, Dayton, OH 45402", date: "2024-12-10", status: "Shipped", reportType: "ASTM Vapor Encroachment", clientName: "Wright Capital" },
];

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cancelOrder, setCancelOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  const handleCancelConfirm = () => {
    if (!cancelOrder) return;
    setOrders((prev) =>
      prev.map((o) =>
        o.guid === cancelOrder.guid ? { ...o, status: "Rejected" } : o
      )
    );
    toast({
      title: "Order cancelled",
      description: `Order ${cancelOrder.guid} has been cancelled.`,
    });
    setCancelOrder(null);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track your environmental report orders</p>
        </div>
        <Button onClick={() => navigate("/orders/new")} className="gap-2">
          <Plus className="w-4 h-4" />
          New Order
        </Button>
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
              <AnimatePresence>
                {orders.map((order, i) => (
                  <motion.tr
                    key={order.guid}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03 }}
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
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {order.status !== "Shipped" && order.status !== "Rejected" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => setCancelOrder(order)}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Full information for this order.</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 py-2">
              <DetailRow label="Order GUID" value={selectedOrder.guid} mono />
              <DetailRow label="Property Address" value={selectedOrder.address} />
              <DetailRow label="Client Name" value={selectedOrder.clientName || "—"} />
              <DetailRow label="Report Type" value={selectedOrder.reportType || "—"} />
              <DetailRow label="Order Date" value={selectedOrder.date} />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[selectedOrder.status]}`}>
                  {selectedOrder.status}
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedOrder(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Order Confirmation */}
      <AlertDialog open={!!cancelOrder} onOpenChange={() => setCancelOrder(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel order{" "}
              <span className="font-mono font-semibold text-foreground">{cancelOrder?.guid}</span>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Order</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancel Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function DetailRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm text-foreground ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}
