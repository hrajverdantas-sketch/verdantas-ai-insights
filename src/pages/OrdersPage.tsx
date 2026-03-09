import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, XCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const statusStyles: Record<string, string> = {
  OnSubmission: "bg-warning/15 text-warning",
  Processing: "bg-info/15 text-info",
  Shipped: "bg-success/15 text-success",
  Rejected: "bg-destructive/15 text-destructive",
};

const reportTypes = [
  "Phase I ESA",
  "Phase II ESA",
  "Transaction Screen",
  "ASTM Vapor Encroachment",
  "Environmental Compliance",
  "Wetland Delineation",
];

interface Order {
  guid: string;
  address: string;
  date: string;
  status: string;
  reportType?: string;
  clientName?: string;
}

const initialOrders: Order[] = [
  { guid: "ORD-8a3f-4b2c", address: "1200 River Rd, Columbus, OH 43215", date: "2024-12-01", status: "Shipped" },
  { guid: "ORD-9c1d-7e5a", address: "450 Main St, Cleveland, OH 44114", date: "2024-12-03", status: "Processing" },
  { guid: "ORD-2b4e-1f8c", address: "780 Oak Ave, Cincinnati, OH 45202", date: "2024-12-05", status: "OnSubmission" },
  { guid: "ORD-5d7g-3a9b", address: "320 Lakeview Dr, Toledo, OH 43604", date: "2024-12-07", status: "Rejected" },
  { guid: "ORD-6e8h-2c4d", address: "90 Industrial Pkwy, Akron, OH 44308", date: "2024-12-09", status: "Processing" },
  { guid: "ORD-7f9i-5d6e", address: "2100 Commerce Blvd, Dayton, OH 45402", date: "2024-12-10", status: "Shipped" },
];

function generateGuid() {
  const hex = () => Math.random().toString(16).substring(2, 6);
  return `ORD-${hex()}-${hex()}`;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [clientName, setClientName] = useState("");
  const [reportType, setReportType] = useState("");
  const { toast } = useToast();

  const handleCreate = () => {
    if (!address.trim() || !reportType) {
      toast({ title: "Missing fields", description: "Please fill in the property address and report type.", variant: "destructive" });
      return;
    }

    const newOrder: Order = {
      guid: generateGuid(),
      address: address.trim(),
      date: new Date().toISOString().split("T")[0],
      status: "OnSubmission",
      reportType,
      clientName: clientName.trim(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setDialogOpen(false);
    setAddress("");
    setClientName("");
    setReportType("");
    toast({ title: "Order created", description: `Order ${newOrder.guid} has been submitted.` });
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track your environmental report orders</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="gap-2">
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
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Create Order Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Order</DialogTitle>
            <DialogDescription>Submit a new environmental report order.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="address">Property Address *</Label>
              <Input
                id="address"
                placeholder="e.g. 1200 River Rd, Columbus, OH 43215"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client Name</Label>
              <Input
                id="client"
                placeholder="e.g. Acme Corp"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Report Type *</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Submit Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
