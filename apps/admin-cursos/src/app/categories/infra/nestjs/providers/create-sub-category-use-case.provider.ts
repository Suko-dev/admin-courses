import { FactoryProvider } from '@nestjs/common';
import { CreateSubCategoryUseCase } from '../../../application/use-cases';
import { SubCategoriesRepository } from '../../../domain/repositories';

export const CreateSubCategoryUseCaseProvider: FactoryProvider = {
  provide: CreateSubCategoryUseCase,
  useFactory: (categoryRepository: SubCategoriesRepository) =>
    new CreateSubCategoryUseCase(categoryRepository),
  inject: [SubCategoriesRepository],
};
