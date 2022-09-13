import { FactoryProvider } from '@nestjs/common';
import {
  CategoryRepository,
  CategoryViewRepository,
} from '../../../domain/repositories';

export const CategoryViewRepositoryProvider: FactoryProvider = {
  provide: CategoryViewRepository,
  useFactory: (repository): CategoryViewRepository => repository,
  inject: [CategoryRepository],
};
