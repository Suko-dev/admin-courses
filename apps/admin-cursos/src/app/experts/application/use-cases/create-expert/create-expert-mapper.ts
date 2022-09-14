import { ExpertProps } from '../../../domain/entities';
import { CreatedExpert } from './create-expert.dto';

export class CreateExpertMapper {
  static toOutput({
    id,
    createdAt,
    avatar,
    about,
    name,
  }: Required<ExpertProps & { id: string }>): CreatedExpert {
    return { name, id, createdAt, avatar, about };
  }
}
