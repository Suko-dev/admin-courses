import { categorySlugify } from '../category-slugify';
import { CodesPrefixes } from '@admin-cursos/types';

describe('CategorySlugify unit test', () => {
  it('should add the expert suffix to a text', () => {
    // Arrange
    const baseCode = 'some code';

    // Act
    const code = categorySlugify(baseCode);

    // Assert
    expect(code).toEqual(`${CodesPrefixes.Category}_some_code`);
  });
});
