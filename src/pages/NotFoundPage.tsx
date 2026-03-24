import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="rounded-[36px] bg-white p-12 text-center shadow-soft">
      <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-coral">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold text-ink">Pagina no encontrada</h1>
      <p className="mt-4 text-slate">
        La ruta solicitada no existe dentro del prototipo actual.
      </p>
      <Link to="/" className="btn-primary mt-6 inline-flex">
        Volver al inicio
      </Link>
    </section>
  );
}
