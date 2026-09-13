export function GroundGallery({ image, name }: { image: string; name: string }) {
  const thumbs = [
    "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=600&q=80",
  ];
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl shadow-md">
        <img src={image} alt={name} className="h-[400px] w-full object-cover" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {thumbs.map((t, i) => (
          <div key={i} className="overflow-hidden rounded-xl shadow">
            <img src={t} alt={`${name} ${i + 1}`} className="h-24 w-full object-cover transition hover:scale-105 sm:h-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
