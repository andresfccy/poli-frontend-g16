import { FormEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { useAppContext } from '../context/AppContext';

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  service: string;
  message: string;
}

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  subject: '',
  service: '',
  message: '',
};

export function ContactPage() {
  const { services } = useAppContext();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<ContactFormState>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const serviceId = searchParams.get('service');

    if (serviceId) {
      setForm((current) => ({ ...current, service: serviceId }));
    }
  }, [searchParams]);

  const validate = () => {
    const nextErrors: Partial<ContactFormState> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) nextErrors.name = 'El nombre es obligatorio.';
    if (!form.email.trim()) nextErrors.email = 'El correo es obligatorio.';
    if (form.email.trim() && !emailRegex.test(form.email)) {
      nextErrors.email = 'Ingresa un correo valido.';
    }
    if (!form.subject.trim()) nextErrors.subject = 'El asunto es obligatorio.';
    if (!form.message.trim()) nextErrors.message = 'El mensaje es obligatorio.';

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmitted(false);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitted(true);
    setForm(initialFormState);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <section className="rounded-[36px] bg-ink p-8 text-cream shadow-soft">
        <SectionHeading
          eyebrow="Contacto"
          title="Conecta con el servicio ideal"
          description="La pagina incorpora formulario, validaciones basicas y mensaje de confirmacion."
          tone="light"
        />
        <div className="mt-8 space-y-5 text-sm leading-7 text-cream/80">
          <p>
            Utiliza este formulario para solicitar informacion, precios o una demostracion del
            servicio.
          </p>
          <div className="rounded-[28px] bg-white/10 p-5">
            <p className="font-semibold text-white">Canales visibles</p>
            <p className="mt-2">correo: contacto@poliservicehub.com</p>
            <p>telefono: +57 300 000 0000</p>
          </div>
        </div>
      </section>

      <section className="rounded-[36px] bg-white p-8 shadow-soft">
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-ink">Nombre completo</span>
              <input
                type="text"
                className="input"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
              {errors.name ? <p className="text-sm text-coral">{errors.name}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-ink">Correo electronico</span>
              <input
                type="email"
                className="input"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
              {errors.email ? <p className="text-sm text-coral">{errors.email}</p> : null}
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-semibold text-ink">Asunto</span>
              <input
                type="text"
                className="input"
                value={form.subject}
                onChange={(event) => setForm({ ...form, subject: event.target.value })}
              />
              {errors.subject ? <p className="text-sm text-coral">{errors.subject}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-ink">Servicio de interes</span>
              <select
                className="input"
                value={form.service}
                onChange={(event) => setForm({ ...form, service: event.target.value })}
              >
                <option value="">Selecciona un servicio</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-ink">Mensaje</span>
            <textarea
              className="input min-h-36 resize-none"
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
            />
            {errors.message ? <p className="text-sm text-coral">{errors.message}</p> : null}
          </label>

          <button type="submit" className="btn-primary">
            Enviar solicitud
          </button>

          {submitted ? (
            <div className="rounded-[24px] bg-teal/10 p-4 text-sm font-semibold text-teal">
              Tu mensaje fue enviado correctamente. En una siguiente iteracion puede conectarse a un
              backend o servicio de correo real.
            </div>
          ) : null}
        </form>
      </section>
    </div>
  );
}
