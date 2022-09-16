import { FactoryProvider } from '@nestjs/common';
import { CoursesRepository } from '../../../domain/repositories';
import { InMemoryCourseRepository } from '../../../application/repositories';

export const CoursesRepositoryProvider: FactoryProvider = {
  provide: CoursesRepository,
  useFactory: (): CoursesRepository => new InMemoryCourseRepository(),
};
