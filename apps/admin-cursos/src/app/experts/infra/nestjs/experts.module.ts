import { Module } from '@nestjs/common';
import { ExpertsResolver } from './graphql/resolvers/experts-resolver';
import CustomProviders from './providers';

@Module({
  providers: [ExpertsResolver, ...CustomProviders],
})
export class ExpertsModule {}
