import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Favoritos', to: '/favoritos' },
  { label: 'Contacto', to: '/contacto' },
  { label: 'Gestion', to: '/gestion' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-white/50 bg-cream/85 backdrop-blur">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
      >
        Saltar al contenido
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
          aria-label="Poli Service Hub - Ir al inicio"
        >
          <div
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ink text-sm font-extrabold text-cream"
            aria-hidden="true"
          >
            PS
          </div>
          <div>
            <p className="font-display text-lg font-bold text-ink">Poli Service Hub</p>
            <p className="text-sm text-slate">Catalogo de experiencias digitales</p>
          </div>
        </NavLink>

        <button
          type="button"
          className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-sand lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? 'Cerrar menu de navegacion' : 'Abrir menu de navegacion'}
        >
          {isOpen ? 'Cerrar' : 'Menu'}
        </button>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Navegacion principal">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-ink text-cream' : 'text-ink hover:bg-white hover:text-coral'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {isOpen ? (
        <nav
          id="mobile-nav"
          className="border-t border-ink/10 px-4 py-4 lg:hidden"
          aria-label="Navegacion movil"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-ink text-cream'
                      : 'bg-white text-ink hover:bg-sand/80 hover:text-coral'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
