import { FactoryProvider } from '@nestjs/common';
import { CreateExpertUseCase } from '../../../application/use-cases';
import { ExpertsRepository } from '../../../domain/repositories';

export const CreateExpertUseCaseProvider: FactoryProvider = {
  provide: CreateExpertUseCase,
  useFactory: (categoryRepository: ExpertsRepository) =>
    new CreateExpertUseCase(categoryRepository),
  inject: [ExpertsRepository],
};
