import { initialServices } from '../data/services';
import type { Service, ServiceFormInput } from '../types/service';

const SERVICES_KEY = 'poli-service-hub-services';
const FAVORITES_KEY = 'poli-service-hub-favorites';
const SIMULATED_DELAY_MS = 400;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function readServices(): Service[] {
  const stored = localStorage.getItem(SERVICES_KEY);
  return stored ? (JSON.parse(stored) as Service[]) : initialServices;
}

function writeServices(services: Service[]): void {
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
}

export async function apiGetServices(): Promise<Service[]> {
  await delay(SIMULATED_DELAY_MS);
  return readServices();
}

export async function apiCreateService(input: ServiceFormInput): Promise<Service> {
  await delay(SIMULATED_DELAY_MS);
  const services = readServices();

  const baseId = slugify(input.name);
  const existingIds = new Set(services.map((s) => s.id));
  let id = baseId || `servicio-${Date.now()}`;
  if (existingIds.has(id)) id = `${id}-${Date.now()}`;

  const service: Service = {
    id,
    featured: false,
    benefits: [
      'Visible en el catalogo principal',
      'Disponible para guardar en favoritos',
      'Editable desde el panel de gestion',
    ],
    tags: [input.category, 'Nuevo'],
    contactEmail: 'contacto@poliservicehub.com',
    ...input,
    image: input.image.trim() || '/images/service-generic.svg',
  };

  writeServices([service, ...services]);
  return service;
}

export async function apiUpdateService(id: string, input: ServiceFormInput): Promise<Service> {
  await delay(SIMULATED_DELAY_MS);
  const services = readServices();
  const index = services.findIndex((s) => s.id === id);

  if (index === -1) throw new Error(`Servicio "${id}" no encontrado`);

  const updated: Service = {
    ...services[index],
    ...input,
    image: input.image.trim() || '/images/service-generic.svg',
  };

  services[index] = updated;
  writeServices(services);
  return updated;
}

export async function apiDeleteService(id: string): Promise<void> {
  await delay(SIMULATED_DELAY_MS);
  const services = readServices();
  writeServices(services.filter((s) => s.id !== id));
}

export async function apiGetFavorites(): Promise<string[]> {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? (JSON.parse(stored) as string[]) : [];
}

export function apiSaveFavorites(ids: string[]): void {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}
