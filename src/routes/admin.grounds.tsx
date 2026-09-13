import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, ArrowLeft } from "lucide-react";
import { groundsApi } from "@/lib/api";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/grounds")({
  head: () => ({ meta: [{ title: "Manage Grounds — Admin" }] }),
  component: AdminGrounds,
});

function AdminGrounds() {
  const navigate = useNavigate();
  const [grounds, setGrounds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<any>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const fetchGrounds = () => {
    setLoading(true);
    groundsApi.getAll().then(setGrounds).finally(() => setLoading(false));
  };

  useEffect(() => { fetchGrounds(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this ground?")) return;
    try { await groundsApi.delete(id); fetchGrounds(); } catch {}
  };

  const handleToggleActive = async (g: any) => {
    try { await groundsApi.update(g._id, { active: !g.active }); fetchGrounds(); } catch {}
  };

  const openEdit = (g: any) => { setEditing(g); setSheetOpen(true); };
  const openAdd = () => { setEditing(null); setSheetOpen(true); };

  const filtered = grounds.filter((g) => g.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <button onClick={() => navigate("/admin/dashboard")} className="mb-2 flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700"><ArrowLeft className="h-4 w-4" /> Dashboard</button>
          <h1 className="text-3xl font-bold text-slate-800">Manage Grounds</h1>
          <p className="mt-1 text-sm text-slate-500">{grounds.length} grounds total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700">
          <Plus className="h-4 w-4" /> Add New Ground
        </button>
      </div>

      {loading ? <p className="text-slate-500">Loading grounds...</p> : (
        <div className="rounded-2xl bg-white p-4 shadow-md sm:p-6">
          <div className="relative mb-4 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search grounds..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm focus:border-emerald-500 focus:outline-none" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-3">Ground</th>
                  <th>Location</th>
                  <th>Price/hr</th>
                  <th>Slots</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((g) => (
                  <tr key={g._id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <img src={g.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                        <span className="font-medium text-slate-800">{g.name}</span>
                      </div>
                    </td>
                    <td className="text-slate-600">{g.location}</td>
                    <td className="font-semibold text-emerald-600">LKR {g.price.toLocaleString()}</td>
                    <td className="text-slate-600">8</td>
                    <td><Switch checked={g.active} onCheckedChange={() => handleToggleActive(g)} /></td>
                    <td>
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(g)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(g._id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <GroundFormSheet editing={editing} onSaved={() => { fetchGrounds(); setSheetOpen(false); }} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function GroundFormSheet({ editing, onSaved }: { editing: any | null; onSaved: () => void }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setLocation(editing.location);
      setDescription(editing.description || "");
      setPrice(String(editing.price));
      setImage(editing.image || "");
    } else {
      setName(""); setLocation(""); setDescription(""); setPrice(""); setImage("");
    }
  }, [editing]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        await groundsApi.update(editing._id, { name, location, description, price: Number(price), image });
      } else {
        await groundsApi.create({ name, location, description, price: Number(price), image, facilities: [], rating: 4.0, reviews: 0 });
      }
      onSaved();
    } catch {}
    setSaving(false);
  };

  return (
    <>
      <SheetHeader><SheetTitle>{editing ? "Edit Ground" : "Add New Ground"}</SheetTitle></SheetHeader>
      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Ground Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Pallekele Cricket Arena" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Kandy" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Price per Hour (LKR)</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="1500" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Image URL</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none" />
        </div>
        <SheetClose asChild>
          <button onClick={handleSave} disabled={saving} className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">
            {saving ? "Saving..." : editing ? "Update Ground" : "Save Ground"}
          </button>
        </SheetClose>
      </div>
    </>
  );
}
