import { FactoryProvider } from '@nestjs/common';
import { UpdateCourseUseCase } from '../../../application/use-cases';
import { CoursesRepository } from '../../../domain/repositories';

export const UpdateCourseUseCaseProvider: FactoryProvider = {
  provide: UpdateCourseUseCase,
  useFactory: (categoryRepository: CoursesRepository) =>
    new UpdateCourseUseCase(categoryRepository),
  inject: [CoursesRepository],
};
