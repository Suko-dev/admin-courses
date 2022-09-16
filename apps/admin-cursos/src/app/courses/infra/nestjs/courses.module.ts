import { Module } from '@nestjs/common';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import CustomProviders from './providers';

@Module({
  providers: [CoursesResolver, ...CustomProviders],
})
export class CoursesModule {}
