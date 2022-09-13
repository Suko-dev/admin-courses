import { slugify } from '@admin-cursos/utils';
import { CodesSuffixes } from '@admin-cursos/types';

export const subCategorySlugify = (text: string): string => {
  return slugify(`${CodesSuffixes.SubCategory} ${text}`);
};
