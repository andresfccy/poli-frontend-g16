import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { useAppContext } from '../context/AppContext';

export function FavoritesPage() {
  const { services, favoriteIds } = useAppContext();
  const favorites = services.filter((service) => favoriteIds.includes(service.id));

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Favoritos"
        title="Tu lista personalizada"
        description="Esta vista recupera desde localStorage los servicios guardados por el usuario."
      />

      {favorites.length === 0 ? (
        <section className="rounded-[32px] bg-white p-10 text-center shadow-soft">
          <h3 className="font-display text-3xl font-bold text-ink">Aun no has guardado servicios</h3>
          <p className="mt-4 text-slate">
            Explora el catalogo y utiliza el boton de favorito para construir tu propia lista.
          </p>
          <Link to="/servicios" className="btn-primary mt-6 inline-flex">
            Ver servicios
          </Link>
        </section>
      ) : (
        <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {favorites.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </section>
      )}
    </div>
  );
}
