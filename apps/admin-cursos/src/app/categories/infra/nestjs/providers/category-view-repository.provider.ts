import { FactoryProvider } from '@nestjs/common';
import {
  CategoriesRepository,
  CategoriesViewRepository,
} from '../../../domain/repositories';

export const CategoryViewRepositoryProvider: FactoryProvider = {
  provide: CategoriesViewRepository,
  useFactory: (repository): CategoriesViewRepository => repository,
  inject: [CategoriesRepository],
};
