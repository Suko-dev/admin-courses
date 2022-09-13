import { FactoryProvider } from '@nestjs/common';
import {
  SubCategoryRepository,
  SubCategoryViewRepository,
} from '../../../domain/repositories';

export const SubCategoryViewRepositoryProvider: FactoryProvider = {
  provide: SubCategoryViewRepository,
  useFactory: (repository): SubCategoryViewRepository => repository,
  inject: [SubCategoryRepository],
};
