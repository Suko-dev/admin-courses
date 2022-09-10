import { CategoryProps } from '../../../domain/entities/category.entity';

export class CreateCategoryMapper {
  static toOutput({
    id,
    createdAt,
    code,
    name,
  }: Required<CategoryProps & { id: string }>): {
    id: string;
    name: string;
    code: string;
    createdAt: Date;
  } {
    return { name, code, id, createdAt };
  }
}
