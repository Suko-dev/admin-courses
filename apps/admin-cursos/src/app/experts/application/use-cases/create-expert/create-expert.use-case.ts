import { CreateExpertInput, CreateExpertOutput } from './create-expert.dto';
import { fail, succeed } from '@admin-cursos/exceptions';
import { ExpertsRepository } from '../../../domain/repositories';
import { CreateExpertMapper } from './create-expert-mapper';
import { ExpertFactory } from '../../../domain/entities';

export class CreateExpertUseCase {
  constructor(private readonly expertRepository: ExpertsRepository) {}

  async execute(
    createExpertInput: CreateExpertInput
  ): Promise<CreateExpertOutput> {
    const expertResult = ExpertFactory.create(createExpertInput);

    if (expertResult.isFailure()) {
      return expertResult;
    }

    const expert = expertResult.value;
    const saveResult = await this.expertRepository.save(expert);

    if (saveResult.isFailure()) {
      return fail(saveResult.value);
    }

    return succeed(CreateExpertMapper.toOutput(expert.toJson()));
  }
}
