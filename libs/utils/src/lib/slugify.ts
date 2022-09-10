import slugifyLib from 'slugify';

export const slugify = (text: string): string => {
  return slugifyLib(text, { lower: true, replacement: '_' });
};
