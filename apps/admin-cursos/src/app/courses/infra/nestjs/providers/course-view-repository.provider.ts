import { FactoryProvider } from '@nestjs/common';
import {
  CoursesRepository,
  CoursesViewRepository,
} from '../../../domain/repositories';

export const CourseViewRepositoryProvider: FactoryProvider = {
  provide: CoursesViewRepository,
  useFactory: (repository): CoursesViewRepository => repository,
  inject: [CoursesRepository],
};
