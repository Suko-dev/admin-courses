import { FactoryProvider } from '@nestjs/common';
import { CreateSubCategoryUseCase } from '../../../application/use-cases';
import { SubCategoryRepository } from '../../../domain/repositories';

export const CreateSubCategoryUseCaseProvider: FactoryProvider = {
  provide: CreateSubCategoryUseCase,
  useFactory: (categoryRepository: SubCategoryRepository) =>
    new CreateSubCategoryUseCase(categoryRepository),
  inject: [SubCategoryRepository],
};
