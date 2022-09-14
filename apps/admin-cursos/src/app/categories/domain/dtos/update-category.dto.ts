import { CoreCategoryProps } from '../entities';

export type UpdateCategoryDto = Partial<Pick<CoreCategoryProps, 'name'>>;
