import { FactoryProvider } from '@nestjs/common';
import { UpdateExpertUseCase } from '../../../application/use-cases';
import { ExpertsRepository } from '../../../domain/repositories';

export const UpdateExpertUseCaseProvider: FactoryProvider = {
  provide: UpdateExpertUseCase,
  useFactory: (categoryRepository: ExpertsRepository) =>
    new UpdateExpertUseCase(categoryRepository),
  inject: [ExpertsRepository],
};
