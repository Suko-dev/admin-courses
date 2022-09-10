import { CategoryProps } from '../../../domain/entities/category.entity';

export class UpdateCategoryMapper {
  static toOutput(props: Required<CategoryProps & { id: string }>): {
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
