export type ServiceCategory =
  | 'Educativo'
  | 'Tecnologico'
  | 'Turistico'
  | 'Comercial';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  description: string;
  image: string;
  location: string;
  price: string;
  duration: string;
  featured: boolean;
  benefits: string[];
  tags: string[];
  contactEmail: string;
}

export interface ServiceFormInput {
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  description: string;
  image: string;
  location: string;
  price: string;
  duration: string;
}
