import { FactoryProvider } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../../application/use-cases';
import { CategoriesRepository } from '../../../domain/repositories';

export const CreateCategoryUseCaseProvider: FactoryProvider = {
  provide: CreateCategoryUseCase,
  useFactory: (categoryRepository: CategoriesRepository) =>
    new CreateCategoryUseCase(categoryRepository),
  inject: [CategoriesRepository],
};
