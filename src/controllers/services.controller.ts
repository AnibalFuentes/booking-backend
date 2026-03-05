import { Request, Response } from 'express';
import { ServiceService } from '../services/service.service';

const serviceService = new ServiceService();

export const getServices = (req: Request, res: Response) => {
  const services = serviceService.getAllServices();
  res.json(services);
};

export const getServiceById = (req: Request, res: Response) => {
  const service = serviceService.getServiceById(req.params.id as string);
  if (service) {
    res.json(service);
  } else {
    res.status(404).json({ message: 'Service not found' });
  }
};

export const createService = (req: Request, res: Response) => {
  const newService = serviceService.addService(req.body);
  res.status(201).json(newService);
};