import { FactoryProvider } from '@nestjs/common';
import { CategoryRepository } from '../../../domain/repositories';
import { InMemoryCategoryRepository } from '../../../application/repositories/in-memory-category.repository';

export const CategoryRepositoryProvider: FactoryProvider = {
  provide: CategoryRepository,
  useFactory: (): CategoryRepository => new InMemoryCategoryRepository(),
};
