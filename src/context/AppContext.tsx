import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import {
  apiCreateService,
  apiDeleteService,
  apiGetFavorites,
  apiGetServices,
  apiSaveFavorites,
  apiUpdateService,
} from '../services/api';
import type { Service, ServiceFormInput } from '../types/service';

interface AppContextValue {
  services: Service[];
  favoriteIds: string[];
  isSubmitting: boolean;
  toggleFavorite: (serviceId: string) => void;
  isFavorite: (serviceId: string) => boolean;
  createService: (input: ServiceFormInput) => Promise<void>;
  updateService: (id: string, input: ServiceFormInput) => Promise<void>;
  deleteService: (serviceId: string) => Promise<void>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([apiGetServices(), apiGetFavorites()]).then(([svcs, favs]) => {
      setServices(svcs);
      setFavoriteIds(favs);
    });
  }, []);

  const toggleFavorite = (serviceId: string) => {
    setFavoriteIds((current) => {
      const next = current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId];
      apiSaveFavorites(next);
      return next;
    });
  };

  const isFavorite = (serviceId: string) => favoriteIds.includes(serviceId);

  const createService = async (input: ServiceFormInput) => {
    setIsSubmitting(true);
    try {
      const service = await apiCreateService(input);
      setServices((current) => [service, ...current]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateService = async (id: string, input: ServiceFormInput) => {
    setIsSubmitting(true);
    try {
      const updated = await apiUpdateService(id, input);
      setServices((current) => current.map((s) => (s.id === id ? updated : s)));
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteService = async (serviceId: string) => {
    setIsSubmitting(true);
    try {
      await apiDeleteService(serviceId);
      setServices((current) => current.filter((s) => s.id !== serviceId));
      setFavoriteIds((current) => {
        const next = current.filter((id) => id !== serviceId);
        apiSaveFavorites(next);
        return next;
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        services,
        favoriteIds,
        isSubmitting,
        toggleFavorite,
        isFavorite,
        createService,
        updateService,
        deleteService,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
}
