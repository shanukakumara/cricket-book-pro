import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { GroundCard } from "@/components/grounds/GroundCard";
import { GroundFilters } from "@/components/grounds/GroundFilters";
import { groundsApi } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/grounds/")({
  component: GroundsIndex,
});

function GroundsIndex() {
  const navigate = useNavigate();
  const [grounds, setGrounds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All");
  const [price, setPrice] = useState([500, 5000]);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sort, setSort] = useState("popular");

  useEffect(() => {
    groundsApi.getAll().then(setGrounds).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let g = grounds.filter((x) =>
      x.name.toLowerCase().includes(query.toLowerCase()) &&
      (location === "All" || x.location === location) &&
      x.price >= price[0] && x.price <= price[1] &&
      (facilities.length === 0 || facilities.every((f) => x.facilities.includes(f))) &&
      (!availableOnly || x.active === true)
    );
    if (sort === "price-asc") g = [...g].sort((a, b) => a.price - b.price);
    if (sort === "rating") g = [...g].sort((a, b) => b.rating - a.rating);
    return g;
  }, [query, location, price, facilities, sort, availableOnly, grounds]);

  const reset = () => { setQuery(""); setLocation("All"); setPrice([500, 5000]); setFacilities([]); setAvailableOnly(false); };
  const toggleFacility = (f: string) => setFacilities((p) => p.includes(f) ? p.filter((x) => x !== f) : [...p, f]);

  if (loading) return (
    <div className="flex items-center justify-center py-20"><p className="text-slate-500">Loading grounds...</p></div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700"><ArrowLeft className="h-4 w-4" /> Back</button>
        <h1 className="mt-2 text-3xl font-bold text-slate-800 sm:text-4xl">Browse Cricket Grounds</h1>
        <p className="mt-2 text-slate-500">Discover top-rated grounds across Sri Lanka.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <GroundFilters
            query={query} setQuery={setQuery}
            location={location} setLocation={setLocation}
            price={price} setPrice={setPrice}
            facilities={facilities} toggleFacility={toggleFacility}
            availableOnly={availableOnly} setAvailableOnly={setAvailableOnly}
            onReset={reset}
          />
        </div>
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">Showing <span className="font-semibold text-slate-800">{filtered.length}</span> of {grounds.length} grounds</p>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((g) => <GroundCard key={g._id} ground={{ ...g, id: g._id }} />)}
          </div>
          {filtered.length === 0 && (
            <div className="rounded-2xl bg-white p-12 text-center shadow-md">
              <p className="text-slate-500">No grounds match your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
