import { Module } from '@nestjs/common';
import { ExpertsResolver } from './graphql/resolvers/expertsResolver';
import CustomProviders from './providers';

@Module({
  providers: [ExpertsResolver, ...CustomProviders],
})
export class ExpertsModule {}
