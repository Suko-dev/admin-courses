import { SubCategoryProps } from '../entities';

export type UpdateSubcategoryDto = Partial<
  Pick<SubCategoryProps, 'mainCategoryId' | 'name'>
>;
