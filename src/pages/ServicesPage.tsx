import { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { useAppContext } from '../context/AppContext';
import type { ServiceCategory } from '../types/service';

const filters: Array<ServiceCategory | 'Todos'> = [
  'Todos',
  'Educativo',
  'Tecnologico',
  'Turistico',
  'Comercial',
];

export function ServicesPage() {
  const { services } = useAppContext();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'Todos'>('Todos');
  const term = search.trim().toLowerCase();

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === 'Todos' || service.category === selectedCategory;
    const matchesSearch =
      term.length === 0 ||
      service.name.toLowerCase().includes(term) ||
      service.shortDescription.toLowerCase().includes(term) ||
      service.tags.join(' ').toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Catalogo"
        title="Listado dinamico de servicios"
        description="Esta vista presenta el catalogo completo en formato card y permite filtrar por categoria o texto."
      />

      <section className="rounded-[32px] bg-white p-6 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-ink">Buscar servicio</span>
            <input
              type="text"
              placeholder="Ej. experiencia, automatizacion, turismo..."
              className="input"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <div className="flex flex-wrap items-end gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === filter
                    ? 'bg-ink text-cream'
                    : 'bg-cream text-ink hover:bg-sand'
                }`}
                onClick={() => setSelectedCategory(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </section>

      {filteredServices.length === 0 ? (
        <section className="rounded-[32px] bg-white p-10 text-center shadow-soft">
          <h3 className="font-display text-2xl font-bold text-ink">No hay resultados</h3>
          <p className="mt-3 text-slate">
            Ajusta el filtro o crea un nuevo servicio desde la seccion de gestion.
          </p>
        </section>
      ) : null}
    </div>
  );
}
