import { FactoryProvider } from '@nestjs/common';
import { UpdateSubCategoryUseCase } from '../../../application/use-cases';
import { SubCategoriesRepository } from '../../../domain/repositories';

export const UpdateSubCategoryUseCaseProvider: FactoryProvider = {
  provide: UpdateSubCategoryUseCase,
  useFactory: (categoryRepository: SubCategoriesRepository) =>
    new UpdateSubCategoryUseCase(categoryRepository),
  inject: [SubCategoriesRepository],
};
