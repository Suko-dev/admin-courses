import { CreateExpertDto } from '../../dtos/create-expert.dto';
import { UniqueId } from '@admin-cursos/domain';
import { Expert } from './expert.entity';
import {
  fail,
  InvalidIdException,
  InvalidParametersException,
  Result,
} from '@admin-cursos/exceptions';
import { DateTools } from '@admin-cursos/utils';

export class ExpertFactory {
  static create({
    id,
    createdAt,
    updatedAt,
    name,
    deletedAt,
    avatar,
    about,
  }: CreateExpertDto): Result<
    InvalidParametersException | InvalidIdException,
    Expert
  > {
    const uniqueId = this.buildId(id);

    if (uniqueId instanceof InvalidIdException) {
      return fail(uniqueId);
    }

    return Expert.create(
      {
        name,
        avatar,
        about,
        createdAt: createdAt ?? DateTools.now(),
        updatedAt: updatedAt ?? DateTools.now(),
        deletedAt: deletedAt || null,
      },
      uniqueId
    );
  }

  private static buildId(id: string): InvalidIdException | UniqueId {
    if (!id) {
      return;
    }
    const uniqueIdResult = UniqueId.create(id);
    return uniqueIdResult.value;
  }
}
