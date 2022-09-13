import { FactoryProvider } from '@nestjs/common';
import { UpdateSubCategoryUseCase } from '../../../application/use-cases';
import { SubCategoryRepository } from '../../../domain/repositories';

export const UpdateSubCategoryUseCaseProvider: FactoryProvider = {
  provide: UpdateSubCategoryUseCase,
  useFactory: (categoryRepository: SubCategoryRepository) =>
    new UpdateSubCategoryUseCase(categoryRepository),
  inject: [SubCategoryRepository],
};
