import { slugify } from '@admin-cursos/utils';
import { CodesSuffixes } from '@admin-cursos/types';

export const categorySlugify = (text: string): string => {
  return slugify(`${CodesSuffixes.Category} ${text}`);
};
