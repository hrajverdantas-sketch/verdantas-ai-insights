import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, ExternalLink, Bot, MapPin, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockReports = [
  { id: "RPT-2024-001", title: "Phase I ESA - Riverside Industrial", address: "1200 River Rd, Columbus, OH 43215", date: "2024-11-15", parcelId: "010-123456" },
  { id: "RPT-2024-002", title: "Phase II ESA - Downtown Brownfield", address: "450 Main St, Cleveland, OH 44114", date: "2024-10-28", parcelId: "020-789012" },
  { id: "RPT-2024-003", title: "Environmental Site Assessment", address: "780 Oak Ave, Cincinnati, OH 45202", date: "2024-09-10", parcelId: "030-345678" },
  { id: "RPT-2024-004", title: "Wetland Delineation Report", address: "320 Lakeview Dr, Toledo, OH 43604", date: "2024-08-22", parcelId: "040-901234" },
  { id: "RPT-2024-005", title: "Soil & Groundwater Investigation", address: "90 Industrial Pkwy, Akron, OH 44308", date: "2024-07-05", parcelId: "050-567890" },
  { id: "RPT-2024-006", title: "Phase I ESA - Retail Plaza", address: "2100 Commerce Blvd, Dayton, OH 45402", date: "2024-06-18", parcelId: "060-234567" },
];

export default function SearchReportsPage() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<"address" | "parcel" | "report" | "client">("address");

  const filtered = mockReports.filter((r) => {
    const q = query.toLowerCase();
    if (!q) return true;
    switch (searchType) {
      case "address": return r.address.toLowerCase().includes(q);
      case "parcel": return r.parcelId.toLowerCase().includes(q);
      case "report": return r.id.toLowerCase().includes(q);
      case "client": return r.title.toLowerCase().includes(q);
      default: return true;
    }
  });

  const types = [
    { key: "address", label: "Address" },
    { key: "parcel", label: "Parcel ID" },
    { key: "report", label: "Report ID" },
    { key: "client", label: "Client Name" },
  ] as const;

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Search Reports</h1>
        <p className="text-sm text-muted-foreground mt-1">Find environmental reports by address, parcel, or report ID</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-5 shadow-card space-y-4">
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t.key}
              onClick={() => setSearchType(t.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                searchType === t.key
                  ? "gradient-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={`Search by ${searchType}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-elevated transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-mono text-primary font-medium">{report.id}</p>
                <h3 className="font-heading font-semibold text-foreground mt-1">{report.title}</h3>
              </div>
            </div>
            <div className="space-y-1.5 mb-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {report.address}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {report.date}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Download className="w-3 h-3 mr-1" /> Download
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <ExternalLink className="w-3 h-3 mr-1" /> Open
              </Button>
              <Button size="sm" className="text-xs gradient-primary text-primary-foreground">
                <Bot className="w-3 h-3 mr-1" /> Summarize
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No reports found matching your search.</p>
        </div>
      )}
    </div>
  );
}
