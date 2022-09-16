import { slugify } from '@admin-cursos/utils';
import { CodesPrefixes } from '@admin-cursos/types';

export const subCategorySlugify = (text: string): string => {
  return slugify(`${CodesPrefixes.SubCategory} ${text}`);
};
