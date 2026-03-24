import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { initialServices } from '../data/services';
import type { Service, ServiceFormInput } from '../types/service';

interface AppContextValue {
  services: Service[];
  favoriteIds: string[];
  toggleFavorite: (serviceId: string) => void;
  isFavorite: (serviceId: string) => boolean;
  createService: (input: ServiceFormInput) => void;
  deleteService: (serviceId: string) => void;
}

const SERVICES_KEY = 'poli-service-hub-services';
const FAVORITES_KEY = 'poli-service-hub-favorites';

const AppContext = createContext<AppContextValue | undefined>(undefined);

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedServices = localStorage.getItem(SERVICES_KEY);
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);

    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }

    if (storedFavorites) {
      setFavoriteIds(JSON.parse(storedFavorites));
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
  }, [isHydrated, services]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds, isHydrated]);

  const toggleFavorite = (serviceId: string) => {
    setFavoriteIds((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId],
    );
  };

  const isFavorite = (serviceId: string) => favoriteIds.includes(serviceId);

  const createService = (input: ServiceFormInput) => {
    const baseId = slugify(input.name);
    const existingIds = new Set(services.map((service) => service.id));
    let nextId = baseId || `servicio-${Date.now()}`;

    if (existingIds.has(nextId)) {
      nextId = `${nextId}-${Date.now()}`;
    }

    const service: Service = {
      id: nextId,
      featured: false,
      benefits: [
        'Visible en el catalogo principal',
        'Disponible para guardar en favoritos',
        'Editable desde futuras iteraciones del proyecto',
      ],
      tags: [input.category, 'Nuevo'],
      contactEmail: 'contacto@poliservicehub.com',
      ...input,
      image: input.image.trim() || '/images/service-generic.svg',
    };

    setServices((current) => [service, ...current]);
  };

  const deleteService = (serviceId: string) => {
    setServices((current) => current.filter((service) => service.id !== serviceId));
    setFavoriteIds((current) => current.filter((id) => id !== serviceId));
  };

  return (
    <AppContext.Provider
      value={{
        services,
        favoriteIds,
        toggleFavorite,
        isFavorite,
        createService,
        deleteService,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
}
