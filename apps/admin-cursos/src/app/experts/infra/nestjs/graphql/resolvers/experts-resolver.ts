import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateExpertUseCase,
  UpdateExpertUseCase,
} from '../../../../application/use-cases';
import { ExpertsViewRepository } from '../../../../domain/repositories';
import {
  GraphqlCreateExpertInput,
  GraphqlCreateExpertOutput,
  GraphqlExpertsOutput,
  GraphqlUpdateExpertInput,
  GraphqlUpdateExpertOutput,
} from '../types';

@Resolver()
export class ExpertsResolver {
  constructor(
    private readonly createExpertUseCase: CreateExpertUseCase,
    private readonly updateExpertUseCase: UpdateExpertUseCase,
    private readonly expertsViewRepository: ExpertsViewRepository
  ) {}

  @Query(() => [GraphqlExpertsOutput])
  async experts(): Promise<GraphqlExpertsOutput[]> {
    return await this.expertsViewRepository.listExpertsView();
  }

  @Mutation(() => GraphqlCreateExpertOutput)
  async createExpert(
    @Args('CreateExpertInput') expertsInput: GraphqlCreateExpertInput
  ): Promise<GraphqlCreateExpertOutput> {
    const expertsResult = await this.createExpertUseCase.execute(expertsInput);

    if (expertsResult.isSuccess()) {
      return expertsResult.value;
    }

    throw expertsResult.value;
  }

  @Mutation(() => GraphqlUpdateExpertOutput, { nullable: true })
  async updateExpert(
    @Args('UpdateExpertInput') expertsInput: GraphqlUpdateExpertInput
  ): Promise<GraphqlUpdateExpertOutput> {
    const expertsResult = await this.updateExpertUseCase.execute(expertsInput);

    if (expertsResult.isSuccess()) {
      return expertsResult.value;
    }

    throw expertsResult.value;
  }
}
