import servicesData from '@/data/data.json';

export interface Service {
  id: number;
  Title: string;
  Slug: string;
  description: string;
  Content: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export function getServicesFromJSON() {
  return {
    data: servicesData.services
  };
}

export function getServiceFromJSON(slug: string) {
  const service = servicesData.services.find(s => s.Slug === slug);
  return {
    data: service ? [service] : []
  };
}
