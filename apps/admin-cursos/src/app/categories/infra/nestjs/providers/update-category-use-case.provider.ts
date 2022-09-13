import { FactoryProvider } from '@nestjs/common';
import { UpdateCategoryUseCase } from '../../../application/use-cases';
import { CategoryRepository } from '../../../domain/repositories';

export const UpdateCategoryUseCaseProvider: FactoryProvider = {
  provide: UpdateCategoryUseCase,
  useFactory: (categoryRepository: CategoryRepository) =>
    new UpdateCategoryUseCase(categoryRepository),
  inject: [CategoryRepository],
};
