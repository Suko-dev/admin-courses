import { slugify } from '@admin-cursos/utils';
import { CodesPrefixes } from '@admin-cursos/types';

export const categorySlugify = (text: string): string => {
  return slugify(`${CodesPrefixes.Category} ${text}`);
};
