import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const facilityList = ["Floodlights","Pavilion","Parking","Scoreboard","Changing Rooms","Canteen"];
const locationList = ["All","Kandy","Colombo","Galle","Matara","Kurunegala"];

type Props = {
  query: string; setQuery: (v: string) => void;
  location: string; setLocation: (v: string) => void;
  price: number[]; setPrice: (v: number[]) => void;
  facilities: string[]; toggleFacility: (f: string) => void;
  availableOnly: boolean; setAvailableOnly: (v: boolean) => void;
  onReset: () => void;
};

export function GroundFilters(p: Props) {
  return (
    <aside className="space-y-6 rounded-2xl bg-white p-6 shadow-md">
      <div>
        <Label className="mb-2 block text-sm font-semibold">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={p.query} onChange={(e) => p.setQuery(e.target.value)} placeholder="Ground name..." className="pl-9" />
        </div>
      </div>
      <div>
        <Label className="mb-2 block text-sm font-semibold">Location</Label>
        <Select value={p.location} onValueChange={p.setLocation}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {locationList.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2 flex items-center justify-between text-sm font-semibold">
          Price Range <span className="font-normal text-slate-500">LKR {p.price[0]} – {p.price[1]}</span>
        </Label>
        <Slider min={500} max={5000} step={100} value={p.price} onValueChange={p.setPrice} />
      </div>
      <div>
        <Label className="mb-2 block text-sm font-semibold">Facilities</Label>
        <div className="space-y-2">
          {facilityList.map((f) => (
            <label key={f} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <Checkbox checked={p.facilities.includes(f)} onCheckedChange={() => p.toggleFacility(f)} />
              {f}
            </label>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">Show available only</Label>
        <Switch checked={p.availableOnly} onCheckedChange={p.setAvailableOnly} />
      </div>
      <div className="flex items-center gap-2">
        <button onClick={p.onReset} className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">Reset Filters</button>
      </div>
    </aside>
  );
}
