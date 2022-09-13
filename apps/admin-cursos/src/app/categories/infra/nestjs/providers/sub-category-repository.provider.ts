import { FactoryProvider } from '@nestjs/common';
import { SubCategoryRepository } from '../../../domain/repositories';
import { InMemorySubSubCategoryRepository } from '../../../application/repositories';

export const SubCategoryRepositoryProvider: FactoryProvider = {
  provide: SubCategoryRepository,
  useFactory: (): SubCategoryRepository =>
    new InMemorySubSubCategoryRepository(),
};
