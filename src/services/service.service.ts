import { Service } from '../types';

export class ServiceService {
  private services: Service[] = [
    {
      id: '1',
      name: 'Corte de cabello',
      description: 'Corte moderno y profesional',
      duration: 45,
      price: 25,
      maxCapacity: 10
    },
    {
      id: '2',
      name: 'Tinte completo',
      description: 'Tinte con productos de alta calidad',
      duration: 120,
      price: 60,
      maxCapacity: 5
    }
  ];

  getAllServices(): Service[] {
    return this.services;
  }

  getServiceById(id: string): Service | undefined {
    return this.services.find(s => s.id === id);
  }

  addService(service: Omit<Service, 'id'>): Service {
    const newService = {
      ...service,
      id: (this.services.length + 1).toString()
    };
    this.services.push(newService);
    return newService;
  }
}