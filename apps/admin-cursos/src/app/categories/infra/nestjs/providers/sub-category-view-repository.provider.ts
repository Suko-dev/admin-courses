import { FactoryProvider } from '@nestjs/common';
import {
  SubCategoriesRepository,
  SubCategoriesViewRepository,
} from '../../../domain/repositories';

export const SubCategoryViewRepositoryProvider: FactoryProvider = {
  provide: SubCategoriesViewRepository,
  useFactory: (repository): SubCategoriesViewRepository => repository,
  inject: [SubCategoriesRepository],
};
