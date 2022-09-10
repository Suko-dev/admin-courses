import { categorySlugify } from '../category-slugify';
import { CodesSuffixes } from '@admin-cursos/types';

describe('CategorySlugify unit test', () => {
  it('should add the category suffix to a text', () => {
    // Arrange
    const baseCode = 'some code';

    // Act
    const code = categorySlugify(baseCode);

    // Assert
    expect(code).toEqual(`${CodesSuffixes.Category}_some_code`);
  });
});
