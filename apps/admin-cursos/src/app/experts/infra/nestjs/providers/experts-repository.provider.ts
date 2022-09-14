import { FactoryProvider } from '@nestjs/common';
import { ExpertsRepository } from '../../../domain/repositories';
import { InMemoryExpertRepository } from '../../../application/repositories';

export const ExpertsRepositoryProvider: FactoryProvider = {
  provide: ExpertsRepository,
  useFactory: (): ExpertsRepository => new InMemoryExpertRepository(),
};
