import { BaseServices } from '@/modules/_shared';
import Model from '../model';

export const { createOne, deleteById } = BaseServices(Model);
