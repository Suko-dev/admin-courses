import { UpdatedSubcategory } from './update-sub-category.dto';
import { SubCategoryProps } from '../../../domain/entities';

export class UpdateSubCategoryMapper {
  static toOutput(
    props: Required<
      SubCategoryProps & {
        id: string;
      }
    >
  ): UpdatedSubcategory {
    return {
      id: props.id,
      code: props.code,
      updatedAt: props.updatedAt,
      name: props.name,
      createdAt: props.createdAt,
      isActive: !props.deletedAt,
      mainCategoryId: props.mainCategoryId.value,
    };
  }
}
