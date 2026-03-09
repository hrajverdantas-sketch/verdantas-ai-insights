import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const reportTypes = [
  "Phase I ESA",
  "Phase II ESA",
  "Transaction Screen",
  "ASTM Vapor Encroachment",
  "Environmental Compliance",
  "Wetland Delineation",
];

const priorities = ["Standard", "Rush", "Expedited"];

function generateGuid() {
  const hex = () => Math.random().toString(16).substring(2, 6);
  return `ORD-${hex()}-${hex()}`;
}

export default function NewOrderPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [address, setAddress] = useState("");
  const [clientName, setClientName] = useState("");
  const [reportType, setReportType] = useState("");
  const [priority, setPriority] = useState("Standard");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.trim() || !reportType) {
      toast({
        title: "Missing fields",
        description: "Please fill in the property address and report type.",
        variant: "destructive",
      });
      return;
    }

    const newGuid = generateGuid();
    toast({
      title: "Order created",
      description: `Order ${newGuid} has been submitted successfully.`,
    });
    navigate("/orders");
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/orders")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            New Order
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Submit a new environmental report order
          </p>
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-card rounded-xl border border-border shadow-card p-6 space-y-5"
      >
        <div className="space-y-2">
          <Label htmlFor="address">Property Address *</Label>
          <Input
            id="address"
            placeholder="e.g. 1200 River Rd, Columbus, OH 43215"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Priority</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {priorities.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Any special instructions or details..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/orders")}
          >
            Cancel
          </Button>
          <Button type="submit" className="gap-2">
            <Send className="w-4 h-4" />
            Submit Order
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
