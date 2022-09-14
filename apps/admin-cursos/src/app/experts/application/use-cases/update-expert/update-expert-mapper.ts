import { ExpertProps } from '../../../domain/entities';
import { UpdatedExpert } from './update-expert.dto';

export class UpdateExpertMapper {
  static toOutput({
    id,
    createdAt,
    avatar,
    about,
    name,
  }: Required<ExpertProps & { id: string }>): UpdatedExpert {
    return { avatar, about, createdAt, id, name };
  }
}
