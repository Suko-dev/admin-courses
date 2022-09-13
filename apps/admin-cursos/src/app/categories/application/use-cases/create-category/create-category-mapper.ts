import { CoreCategoryProps } from '../../../domain/entities/core-category.entity';
import { CreatedCategory } from './create-category.dto';

export class CreateCategoryMapper {
  static toOutput({
    id,
    createdAt,
    code,
    name,
  }: Required<CoreCategoryProps & { id: string }>): CreatedCategory {
    return { name, code, id, createdAt };
  }
}
