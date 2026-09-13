import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GroundGallery } from "@/components/grounds/GroundGallery";
import { BookingPanel } from "@/components/booking/BookingPanel";
import { groundsApi } from "@/lib/api";
import { Star, MapPin, Lightbulb, Building2, ParkingCircle, Tv, Shirt, Coffee, ArrowLeft, Navigation, Clock, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Floodlights: Lightbulb, Pavilion: Building2, Parking: ParkingCircle,
  Scoreboard: Tv, "Changing Rooms": Shirt, Canteen: Coffee,
};

const cityCoords: Record<string, [number, number]> = {
  Colombo: [6.9271, 79.8612],
  Kandy: [7.2906, 80.6337],
  Galle: [6.0535, 80.2167],
  Matara: [5.9485, 80.5428],
  Kurunegala: [7.4818, 80.3623],
};

export const Route = createFileRoute("/grounds/$id")({
  head: ({ params }) => ({
    meta: [{ title: `Ground #${params.id} — CricketBook` }],
  }),
  component: GroundDetail,
});

function GroundDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [ground, setGround] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    groundsApi.getById(id).then(setGround).catch(() => setGround(null)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center py-20"><p className="text-slate-500">Loading...</p></div>
  );

  if (!ground) return <div className="flex min-h-screen items-center justify-center"><p className="text-slate-500">Ground not found</p></div>;

  const groundWithId = { ...ground, id: ground._id };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <GroundGallery image={ground.image} name={ground.name} />
          <div>
            <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">{ground.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {ground.location}, Sri Lanka</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {ground.rating} ({ground.reviews} reviews)</span>
            </div>
            <p className="mt-4 leading-relaxed text-slate-600">{ground.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">Facilities</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {ground.facilities.map((f: string) => {
                const Icon = iconMap[f] ?? Star;
                return (
                  <span key={f} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700">
                    <Icon className="h-4 w-4 text-emerald-600" /> {f}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">Location &amp; Directions</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <MapPin className="h-5 w-5" />
                  <h3 className="font-semibold text-slate-800">Address</h3>
                </div>
                <p className="mt-2 text-sm text-slate-600">{ground.name}<br />{ground.location}, Sri Lanka</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Navigation className="h-5 w-5" />
                  <h3 className="font-semibold text-slate-800">Getting There</h3>
                </div>
                <p className="mt-2 text-sm text-slate-600">Located in the heart of {ground.location}. Easily accessible by car or public transport. Parking available on-site.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Clock className="h-5 w-5" />
                  <h3 className="font-semibold text-slate-800">Operating Hours</h3>
                </div>
                <p className="mt-2 text-sm text-slate-600">Daily: 6:00 AM – 10:00 PM</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Phone className="h-5 w-5" />
                  <h3 className="font-semibold text-slate-800">Contact</h3>
                </div>
                <p className="mt-2 text-sm text-slate-600">+94 11 234 5678<br />info@{ground.name.toLowerCase().replace(/\s+/g, "")}.lk</p>
              </div>
            </div>
              {(() => {
                const c = cityCoords[ground.location] || [7.5, 80.0];
                const pad = 0.02;
                const bbox = `${c[1]-pad},${c[0]-pad},${c[1]+pad},${c[0]+pad}`;
                return (
                  <div className="mt-4 h-56 overflow-hidden rounded-2xl shadow-md">
                    <iframe
                      title={`Map of ${ground.name}`}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${c[0]},${c[1]}`}
                      className="rounded-2xl"
                    />
                  </div>
                );
              })()}
          </div>
        </div>

        <div>
          <BookingPanel ground={groundWithId} />
        </div>
      </div>
    </div>
  );
}
