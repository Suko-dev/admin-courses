import { Module } from '@nestjs/common';
import { CategoryResolver } from './graphql/resolvers/category.resolver';
import CustomProviders from './providers';

@Module({
  providers: [CategoryResolver, ...CustomProviders],
})
export class CategoriesModule {}
