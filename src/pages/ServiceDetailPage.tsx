import { Link, Navigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export function ServiceDetailPage() {
  const { serviceId } = useParams();
  const { services, isFavorite, toggleFavorite } = useAppContext();
  const service = services.find((item) => item.id === serviceId);

  if (!serviceId || !service) {
    return <Navigate to="/servicios" replace />;
  }

  const favorite = isFavorite(service.id);

  return (
    <div className="space-y-10">
      <Link to="/servicios" className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft">
        Volver al catalogo
      </Link>

      <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="overflow-hidden rounded-[36px] bg-white shadow-soft">
          <img src={service.image} alt={service.name} className="h-full w-full object-cover" />
        </div>
        <div className="rounded-[36px] bg-white p-8 shadow-soft">
          <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-coral">
            {service.category}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-ink">{service.name}</h1>
          <p className="mt-5 text-base leading-7 text-slate">{service.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-cream p-4">
              <p className="text-sm text-slate">Ubicacion</p>
              <p className="mt-1 font-semibold text-ink">{service.location}</p>
            </div>
            <div className="rounded-[24px] bg-cream p-4">
              <p className="text-sm text-slate">Duracion</p>
              <p className="mt-1 font-semibold text-ink">{service.duration}</p>
            </div>
            <div className="rounded-[24px] bg-cream p-4">
              <p className="text-sm text-slate">Precio base</p>
              <p className="mt-1 font-semibold text-ink">{service.price}</p>
            </div>
            <div className="rounded-[24px] bg-cream p-4">
              <p className="text-sm text-slate">Contacto</p>
              <p className="mt-1 font-semibold text-ink">{service.contactEmail}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                favorite
                  ? 'bg-coral text-white hover:bg-coral/90'
                  : 'bg-ink text-cream hover:bg-ink/90'
              }`}
              onClick={() => toggleFavorite(service.id)}
            >
              {favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button>
            <Link to={`/contacto?service=${service.id}`} className="btn-secondary">
              Contactar por este servicio
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[32px] bg-teal p-8 text-white shadow-soft">
          <h2 className="font-display text-3xl font-bold">Beneficios clave</h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-white/85">
            {service.benefits.map((benefit) => (
              <li key={benefit}>- {benefit}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-[32px] bg-white p-8 shadow-soft">
          <h2 className="font-display text-3xl font-bold text-ink">Etiquetas y enfoque</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-sand bg-cream px-4 py-2 text-sm font-semibold text-ink"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm leading-7 text-slate">
            Esta pagina cumple con la vista de detalle solicitada: imagen representativa,
            informacion completa y acciones de interaccion para el usuario.
          </p>
        </article>
      </section>
    </div>
  );
}
