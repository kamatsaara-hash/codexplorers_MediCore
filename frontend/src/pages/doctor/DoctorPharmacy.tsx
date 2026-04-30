import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import Pharmacy from "@/pages/shared/Pharmacy";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const DoctorPharmacy = () => {
  const [med, setMed] = useState("");

  return (
    <div>
      <Pharmacy readOnlyNote="Read-only view of hospital medicine stock." />

      <div className="mt-6 glass rounded-2xl p-5">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-4 w-4" />
          <h3 className="font-display text-lg font-semibold">Suggest a medicine</h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Send a request to pharmacy administration to add or restock.</p>
        <div className="mt-4 flex gap-2">
          <Input value={med} onChange={(e) => setMed(e.target.value)} placeholder="e.g. Azithromycin 250mg" />
          <Button
            onClick={() => {
              if (!med) return;
              toast.success(`Request sent for ${med}`);
              setMed("");
            }}
            className="bg-gradient-primary text-primary-foreground"
          >
            Send request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorPharmacy;
