import { FactoryProvider } from '@nestjs/common';
import { UpdateCategoryUseCase } from '../../../application/use-cases';
import { CategoriesRepository } from '../../../domain/repositories';

export const UpdateCategoryUseCaseProvider: FactoryProvider = {
  provide: UpdateCategoryUseCase,
  useFactory: (categoryRepository: CategoriesRepository) =>
    new UpdateCategoryUseCase(categoryRepository),
  inject: [CategoriesRepository],
};
