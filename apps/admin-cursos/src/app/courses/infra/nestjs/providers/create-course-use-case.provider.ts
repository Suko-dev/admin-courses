import { FactoryProvider } from '@nestjs/common';
import { CreateCourseUseCase } from '../../../application/use-cases';
import { CoursesRepository } from '../../../domain/repositories';

export const CreateCourseUseCaseProvider: FactoryProvider = {
  provide: CreateCourseUseCase,
  useFactory: (categoryRepository: CoursesRepository) =>
    new CreateCourseUseCase(categoryRepository),
  inject: [CoursesRepository],
};
