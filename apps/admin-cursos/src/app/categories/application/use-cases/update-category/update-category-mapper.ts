import { CoreCategoryProps } from '../../../domain/entities/core-category.entity';

export class UpdateCategoryMapper {
  static toOutput(props: Required<CoreCategoryProps & { id: string }>): {
    id: string;
    name: string;
    code: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  } {
    return { ...props, isActive: !props.deletedAt };
  }
}
