import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { useAppContext } from '../context/AppContext';

const stats = [
  { label: 'Servicios activos', value: '6+' },
  { label: 'Categorias integradas', value: '4' },
  { label: 'Interacciones guardadas', value: 'LocalStorage' },
];

const testimonials = [
  {
    name: 'Equipo de innovacion academica',
    quote:
      'La propuesta permite mostrar contenido, validar interes del usuario y dejar clara la navegacion principal.',
  },
  {
    name: 'Emprendimiento local',
    quote:
      'La seccion de gestion ayuda a demostrar el CRUD basico de una forma simple para la entrega.',
  },
];

export function HomePage() {
  const { services } = useAppContext();
  const featured = services.filter((service) => service.featured).slice(0, 3);

  return (
    <div className="space-y-20">
      <section className="grid gap-8 overflow-hidden rounded-[36px] bg-ink px-6 py-10 text-cream shadow-soft sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-14">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-gold">
            Entrega 1 · prototipo funcional
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Una plataforma para explorar servicios digitales sin sobrecargar la experiencia.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-cream/80">
            Poli Service Hub organiza experiencias educativas, tecnologicas, turisticas y
            comerciales en un catalogo claro, con detalle, favoritos, formulario de contacto y
            gestion basica de servicios.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/servicios" className="btn-primary bg-coral text-white hover:bg-coral/90">
              Explorar servicios
            </Link>
            <Link to="/contacto" className="btn-secondary border-white/30 text-cream hover:bg-white/10">
              Contactar ahora
            </Link>
          </div>
        </div>

        <div className="grid gap-4 rounded-[28px] bg-white/8 p-5 backdrop-blur">
          {stats.map((item) => (
            <div key={item.label} className="rounded-[24px] bg-white/10 p-5">
              <p className="text-sm text-cream/70">{item.label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Destacados"
          title="Servicios listos para explorar"
          description="La pagina principal incluye cards dinamicas con informacion breve, imagen, categorias y acceso directo al detalle."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[32px] bg-white p-8 shadow-soft">
          <SectionHeading
            eyebrow="Como funciona"
            title="Flujo pensado para la entrega"
            description="Cada seccion del prototipo responde a un requisito del enunciado y puede navegarse desde el menu principal."
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[28px] bg-teal p-6 text-white shadow-soft">
            <h3 className="font-display text-2xl font-bold">Catalogo dinamico</h3>
            <p className="mt-3 text-sm leading-6 text-white/85">
              Los servicios se renderizan desde un arreglo local y pueden ampliarse desde la seccion
              de gestion.
            </p>
          </div>
          <div className="rounded-[28px] bg-coral p-6 text-white shadow-soft">
            <h3 className="font-display text-2xl font-bold">Favoritos persistentes</h3>
            <p className="mt-3 text-sm leading-6 text-white/85">
              El usuario puede guardar servicios y volver a verlos gracias a `localStorage`.
            </p>
          </div>
          <div className="rounded-[28px] bg-white p-6 shadow-soft">
            <h3 className="font-display text-2xl font-bold text-ink">Formulario validado</h3>
            <p className="mt-3 text-sm leading-6 text-slate">
              La pagina de contacto valida campos obligatorios y formato basico de correo.
            </p>
          </div>
          <div className="rounded-[28px] bg-gold p-6 text-ink shadow-soft">
            <h3 className="font-display text-2xl font-bold">Mini CRUD</h3>
            <p className="mt-3 text-sm leading-6 text-ink/85">
              La gestion permite crear nuevos servicios y eliminar los existentes para mostrar
              interaccion basica.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[36px] bg-white px-6 py-10 shadow-soft sm:px-10">
        <SectionHeading
          eyebrow="Testimonios"
          title="Seccion informativa para enriquecer el home"
          description="El home incorpora evidencia visual de valor, navegacion y llamados a la accion."
          align="center"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-[28px] bg-cream p-6">
              <p className="text-base leading-7 text-ink">"{item.quote}"</p>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.15em] text-slate">
                {item.name}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
