import { CreateCategoryDto } from './create-category.dto';

export interface CreateSubCategoryDto extends CreateCategoryDto {
  mainCategoryId: string;
}
