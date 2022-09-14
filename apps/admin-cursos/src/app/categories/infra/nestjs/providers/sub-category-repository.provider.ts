import { FactoryProvider } from '@nestjs/common';
import { SubCategoriesRepository } from '../../../domain/repositories';
import { InMemorySubSubCategoryRepository } from '../../../application/repositories';

export const SubCategoryRepositoryProvider: FactoryProvider = {
  provide: SubCategoriesRepository,
  useFactory: (): SubCategoriesRepository =>
    new InMemorySubSubCategoryRepository(),
};
