import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import type { Service } from '../types/service';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { isFavorite, toggleFavorite } = useAppContext();
  const favorite = isFavorite(service.id);

  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-soft transition hover:-translate-y-1">
      <div className="aspect-[16/10] overflow-hidden bg-sand/60">
        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-5 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal">
              {service.category}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-ink">{service.name}</h3>
          </div>
          <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-slate">
            {service.duration}
          </span>
        </div>

        <p className="text-sm leading-6 text-slate">{service.shortDescription}</p>

        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-sand bg-cream px-3 py-1 text-xs font-semibold text-ink"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-ink">{service.price}</p>
          <div className="flex gap-3">
            <button
              type="button"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                favorite
                  ? 'bg-coral text-white hover:bg-coral/90'
                  : 'bg-cream text-ink hover:bg-sand'
              }`}
              onClick={() => toggleFavorite(service.id)}
            >
              {favorite ? 'Guardado' : 'Favorito'}
            </button>
            <Link to={`/servicios/${service.id}`} className="btn-primary">
              Ver mas
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
