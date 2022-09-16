import { CoreCategoryProps } from '../../../domain/entities';
import { UpdateCategoryData } from './update-category.dto';

export class UpdateCategoryMapper {
  static toOutput(
    props: Required<CoreCategoryProps & { id: string }>
  ): UpdateCategoryData {
    return { ...props, isActive: !props.deletedAt };
  }
}
