export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10 bg-white/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <h3 className="font-display text-xl font-bold text-ink">Poli Service Hub</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate">
            Prototipo universitario para explorar servicios digitales, destacar experiencias y
            demostrar interaccion en frontend con React y Tailwind.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-extrabold uppercase tracking-[0.2em] text-slate">
            Navegacion
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-ink">
            <li>Inicio</li>
            <li>Servicios</li>
            <li>Favoritos</li>
            <li>Contacto</li>
            <li>Gestion</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-extrabold uppercase tracking-[0.2em] text-slate">
            Contacto
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-ink">
            <li>correo: hola@poliservicehub.com</li>
            <li>telefono: +57 300 000 0000</li>
            <li>horario: lunes a viernes, 8:00 a.m. a 6:00 p.m.</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
