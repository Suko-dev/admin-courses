import { FactoryProvider } from '@nestjs/common';
import {
  ExpertsRepository,
  ExpertsViewRepository,
} from '../../../domain/repositories';

export const ExpertViewRepositoryProvider: FactoryProvider = {
  provide: ExpertsViewRepository,
  useFactory: (repository): ExpertsViewRepository => repository,
  inject: [ExpertsRepository],
};
