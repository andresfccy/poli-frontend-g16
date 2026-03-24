import { FormEvent, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { useAppContext } from '../context/AppContext';
import type { ServiceCategory } from '../types/service';

const categories: ServiceCategory[] = ['Educativo', 'Tecnologico', 'Turistico', 'Comercial'];

const initialForm = {
  name: '',
  category: 'Educativo' as ServiceCategory,
  shortDescription: '',
  description: '',
  image: '',
  location: '',
  price: '',
  duration: '',
};

export function AdminPage() {
  const { services, createService, deleteService } = useAppContext();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [created, setCreated] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreated(false);

    if (
      !form.name.trim() ||
      !form.shortDescription.trim() ||
      !form.description.trim() ||
      !form.location.trim() ||
      !form.price.trim() ||
      !form.duration.trim()
    ) {
      setError('Completa todos los campos obligatorios antes de crear el servicio.');
      return;
    }

    createService(form);
    setForm(initialForm);
    setError('');
    setCreated(true);
  };

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Gestion"
        title="Mini CRUD para la entrega"
        description="Esta vista permite crear nuevos servicios y eliminar existentes para evidenciar manipulacion basica de datos."
      />

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form className="rounded-[36px] bg-white p-8 shadow-soft" onSubmit={handleSubmit}>
          <h3 className="font-display text-2xl font-bold text-ink">Crear servicio</h3>
          <div className="mt-6 grid gap-4">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-ink">Nombre</span>
              <input
                className="input"
                type="text"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-ink">Categoria</span>
              <select
                className="input"
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value as ServiceCategory })
                }
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-ink">Descripcion breve</span>
              <textarea
                className="input min-h-24 resize-none"
                value={form.shortDescription}
                onChange={(event) => setForm({ ...form, shortDescription: event.target.value })}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-ink">Descripcion completa</span>
              <textarea
                className="input min-h-32 resize-none"
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-ink">Ubicacion</span>
                <input
                  className="input"
                  type="text"
                  value={form.location}
                  onChange={(event) => setForm({ ...form, location: event.target.value })}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-ink">Precio</span>
                <input
                  className="input"
                  type="text"
                  value={form.price}
                  onChange={(event) => setForm({ ...form, price: event.target.value })}
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-ink">Duracion</span>
                <input
                  className="input"
                  type="text"
                  value={form.duration}
                  onChange={(event) => setForm({ ...form, duration: event.target.value })}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-ink">URL o ruta de imagen</span>
                <input
                  className="input"
                  type="text"
                  placeholder="/images/service-generic.svg"
                  value={form.image}
                  onChange={(event) => setForm({ ...form, image: event.target.value })}
                />
              </label>
            </div>

            {error ? <p className="text-sm font-semibold text-coral">{error}</p> : null}
            {created ? (
              <p className="text-sm font-semibold text-teal">
                Servicio creado correctamente y guardado en `localStorage`.
              </p>
            ) : null}

            <button type="submit" className="btn-primary">
              Crear servicio
            </button>
          </div>
        </form>

        <section className="rounded-[36px] bg-white p-8 shadow-soft">
          <h3 className="font-display text-2xl font-bold text-ink">Servicios registrados</h3>
          <div className="mt-6 space-y-4">
            {services.map((service) => (
              <article
                key={service.id}
                className="flex flex-col gap-4 rounded-[28px] border border-sand p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">
                    {service.category}
                  </p>
                  <h4 className="mt-2 font-display text-xl font-bold text-ink">{service.name}</h4>
                  <p className="mt-2 text-sm text-slate">{service.shortDescription}</p>
                </div>
                <button
                  type="button"
                  className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition hover:bg-coral"
                  onClick={() => deleteService(service.id)}
                >
                  Eliminar
                </button>
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
