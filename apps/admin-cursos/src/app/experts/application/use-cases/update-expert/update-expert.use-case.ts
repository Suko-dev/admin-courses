import { fail, succeed } from '@admin-cursos/exceptions';
import { ExpertsRepository } from '../../../domain/repositories';
import { UpdateExpertMapper } from './update-expert-mapper';
import { UpdateExpertInput, UpdateExpertOutput } from './update-expert.dto';
import { isNotEmptyObject } from 'class-validator';
import { ObjectTools } from '@admin-cursos/utils';

export class UpdateExpertUseCase {
  constructor(private readonly expertRepository: ExpertsRepository) {}

  async execute({
    id,
    avatar,
    about,
    name,
  }: UpdateExpertInput): Promise<UpdateExpertOutput> {
    const expertResult = await this.expertRepository.findByIdOrFail(id);

    if (expertResult.isFailure()) {
      return fail(expertResult.value);
    }

    const expert = expertResult.value;

    const updateProps = ObjectTools.filterUndefinedKeysOf({
      avatar,
      about,
      name,
    });

    if (isNotEmptyObject(updateProps)) {
      const result = expert.update(updateProps);
      if (result.isFailure()) {
        return fail(result.value);
      }

      const saveResult = await this.expertRepository.save(expert);

      if (saveResult.isFailure()) {
        return fail(saveResult.value);
      }
    }

    return succeed(UpdateExpertMapper.toOutput(expert.toJson()));
  }
}
