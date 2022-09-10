import { FactoryProvider } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../../application/use-cases';
import { CategoryRepository } from '../../../domain/repositories';

export const CreateCategoryUseCaseProvider: FactoryProvider = {
  provide: CreateCategoryUseCase,
  useFactory: (categoryRepository: CategoryRepository) =>
    new CreateCategoryUseCase(categoryRepository),
  inject: [CategoryRepository],
};
