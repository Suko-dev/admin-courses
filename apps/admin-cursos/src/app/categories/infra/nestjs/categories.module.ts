import { Module } from '@nestjs/common';
import { CategoryResolver } from './graphql/resolvers/category.resolver';
import { CategoryRepositoryProvider } from './providers/category-repository.provider';
import { CreateCategoryUseCaseProvider } from './providers/create-category-use-case.provider';

@Module({
  providers: [
    CategoryResolver,
    CategoryRepositoryProvider,
    CreateCategoryUseCaseProvider,
  ],
})
export class CategoriesModule {}
