import { slugify } from '@admin-cursos/utils';
import { CodesPrefixes } from '@admin-cursos/types';

export const courseSlugify = (text: string): string => {
  return slugify(`${CodesPrefixes.Course} ${text}`);
};
