import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/infra/nestjs/categories.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ExpertsModule } from './experts/infra/nestjs/experts.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    CategoriesModule,
    ExpertsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
