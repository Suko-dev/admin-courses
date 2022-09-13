import { SubCategoryProps } from '../../../domain/entities';
import { CreatedSubCategory } from './create-sub-category.dto';

export class CreateSubCategoryMapper {
  static toOutput({
    id,
    createdAt,
    code,
    name,
    mainCategoryId,
  }: Required<
    SubCategoryProps & {
      id: string;
    }
  >): CreatedSubCategory {
    return { name, code, id, createdAt, mainCategoryId: mainCategoryId.value };
  }
}
