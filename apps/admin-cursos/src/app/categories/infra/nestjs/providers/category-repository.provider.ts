import { FactoryProvider } from '@nestjs/common';
import { CategoriesRepository } from '../../../domain/repositories';
import { InMemoryCategoryRepository } from '../../../application/repositories';

export const CategoryRepositoryProvider: FactoryProvider = {
  provide: CategoriesRepository,
  useFactory: (): CategoriesRepository => new InMemoryCategoryRepository(),
};
