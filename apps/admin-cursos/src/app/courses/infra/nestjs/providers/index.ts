import { CoursesRepositoryProvider } from './courses-repository.provider';
import { UpdateCourseUseCaseProvider } from './update-course-use-case.provider';
import { CreateCourseUseCaseProvider } from './create-course-use-case.provider';
import { CourseViewRepositoryProvider } from './course-view-repository.provider';

export default [
  CoursesRepositoryProvider,
  UpdateCourseUseCaseProvider,
  CreateCourseUseCaseProvider,
  CourseViewRepositoryProvider,
];
