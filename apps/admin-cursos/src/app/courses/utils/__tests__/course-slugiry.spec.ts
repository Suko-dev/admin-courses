import { courseSlugify } from '../course-slugify';
import { CodesPrefixes } from '@admin-cursos/types';

describe('CourseSlugify unit test', () => {
  it('should add the expert suffix to a text', () => {
    // Arrange
    const baseText = 'some name';

    // Act
    const slug = courseSlugify(baseText);

    // Assert
    expect(slug).toEqual(`${CodesPrefixes.Course}_some_name`);
  });
});
