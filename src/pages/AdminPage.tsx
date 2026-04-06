import { type FormEvent, useRef, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { useAppContext } from '../context/AppContext';
import type { Service, ServiceCategory } from '../types/service';

const categories: ServiceCategory[] = ['Educativo', 'Tecnologico', 'Turistico', 'Comercial'];

const emptyForm = {
  name: '',
  category: 'Educativo' as ServiceCategory,
  shortDescription: '',
  description: '',
  image: '',
  location: '',
  price: '',
  duration: '',
};

function serviceToForm(s: Service) {
  return {
    name: s.name,
    category: s.category,
    shortDescription: s.shortDescription,
    description: s.description,
    image: s.image,
    location: s.location,
    price: s.price,
    duration: s.duration,
  };
}

export function AdminPage() {
  const { services, isSubmitting, createService, updateService, deleteService } = useAppContext();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setForm(serviceToForm(service));
    setError('');
    setFeedback('');
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError('');
    setFeedback('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback('');

    if (
      !form.name.trim() ||
      !form.shortDescription.trim() ||
      !form.description.trim() ||
      !form.location.trim() ||
      !form.price.trim() ||
      !form.duration.trim()
    ) {
      setError('Completa todos los campos obligatorios antes de continuar.');
      return;
    }

    setError('');

    if (editingId) {
      await updateService(editingId, form);
      setEditingId(null);
      setForm(emptyForm);
      setFeedback('Servicio actualizado correctamente.');
    } else {
      await createService(form);
      setForm(emptyForm);
      setFeedback('Servicio creado correctamente.');
    }
  };

  const handleDelete = async (serviceId: string) => {
    if (editingId === serviceId) cancelEdit();
    await deleteService(serviceId);
  };

  const isEditing = editingId !== null;

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Gestion"
        title="Panel de administracion"
        description="Crea, edita y elimina servicios. Las operaciones pasan por una capa de API simulada con retardo asincrono para representar un backend real."
      />

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <form
          ref={formRef}
          className="rounded-[36px] bg-white p-6 shadow-soft sm:p-8"
          onSubmit={handleSubmit}
          aria-label={isEditing ? 'Formulario de edicion de servicio' : 'Formulario de creacion de servicio'}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-2xl font-bold text-ink">
              {isEditing ? 'Editar servicio' : 'Crear servicio'}
            </h3>
            {isEditing ? (
              <button
                type="button"
                className="rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-sand"
                onClick={cancelEdit}
              >
                Cancelar
              </button>
            ) : null}
          </div>

          {isEditing ? (
            <p className="mt-2 text-sm text-slate">
              Editando:{' '}
              <span className="font-semibold text-coral">{form.name}</span>
            </p>
          ) : null}

          <div className="mt-6 grid gap-4">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-ink">Nombre</span>
              <input
                className="input"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-ink">Categoria</span>
              <select
                className="input"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as ServiceCategory })
                }
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-ink">Descripcion breve</span>
              <textarea
                className="input min-h-24 resize-none"
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-ink">Descripcion completa</span>
              <textarea
                className="input min-h-32 resize-none"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-ink">Ubicacion</span>
                <input
                  className="input"
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-ink">Precio</span>
                <input
                  className="input"
                  type="text"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
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
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-ink">URL o ruta de imagen</span>
                <input
                  className="input"
                  type="text"
                  placeholder="/images/service-generic.svg"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </label>
            </div>

            {error ? (
              <p className="text-sm font-semibold text-coral" role="alert">
                {error}
              </p>
            ) : null}

            {feedback ? (
              <p className="text-sm font-semibold text-teal" role="status" aria-live="polite">
                {feedback}
              </p>
            ) : null}

            <button
              type="submit"
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting
                ? isEditing
                  ? 'Guardando...'
                  : 'Creando...'
                : isEditing
                  ? 'Guardar cambios'
                  : 'Crear servicio'}
            </button>
          </div>
        </form>

        <section className="rounded-[36px] bg-white p-6 shadow-soft sm:p-8">
          <h3 className="font-display text-2xl font-bold text-ink">Servicios registrados</h3>
          <ul className="mt-6 space-y-4" role="list">
            {services.map((service) => (
              <li
                key={service.id}
                className={`rounded-[28px] border p-4 transition sm:p-5 ${
                  editingId === service.id ? 'border-coral bg-coral/5' : 'border-sand'
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">
                      {service.category}
                    </p>
                    <h4 className="mt-2 font-display text-xl font-bold text-ink">
                      {service.name}
                    </h4>
                    <p className="mt-2 line-clamp-2 text-sm text-slate">
                      {service.shortDescription}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      className="rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-sand disabled:opacity-50"
                      onClick={() => startEdit(service)}
                      disabled={isSubmitting}
                      aria-label={`Editar ${service.name}`}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition hover:bg-coral disabled:opacity-50"
                      onClick={() => handleDelete(service.id)}
                      disabled={isSubmitting}
                      aria-label={`Eliminar ${service.name}`}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
}
