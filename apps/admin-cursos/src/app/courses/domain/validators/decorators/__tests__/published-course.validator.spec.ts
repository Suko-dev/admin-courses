import { Validate, validateSync } from 'class-validator';
import { CourseCanBePublished } from '../published-course.validator';

class StubClass {
  thumbnail;
  previewUrl;
  duration;
  description;

  @Validate(CourseCanBePublished)
  itemToValidate?: Date = new Date();
}

type Key = 'thumbnail' | 'previewUrl' | 'duration' | 'description';

describe('CourseCanBePublished Unit test', () => {
  describe.each([
    ['a complete course', 'no error', undefined, 0],
    ['a course without description', 'one error', 'description', 1],
    ['a course without thumbnail', 'one error', 'thumbnail', 1],
    ['a course without preview url', 'one error', 'previewUrl', 1],
    ['a course without duration', 'one error', 'duration', 1],
  ])(
    'when item to be validated is %s',
    (_, responseDescription, missingParam: Key, expectedErrors: number) => {
      it(`should return ${responseDescription}`, () => {
        const classToValidate = buildCourseWithout(missingParam);

        // Act
        const errors = validateSync(classToValidate);

        // Assert
        expect(errors.length).toEqual(expectedErrors);
      });
    }
  );

  describe.each([['description'], ['thumbnail'], ['previewUrl'], ['duration']])(
    'when item to be validated has no releaseDate, even if has no%s',
    (missingParam: Key) => {
      it(`should be valid`, () => {
        const classToValidate = buildCourseWithout(missingParam);
        delete classToValidate.itemToValidate;

        // Act
        const errors = validateSync(classToValidate);

        // Assert
        expect(errors.length).toEqual(0);
      });
    }
  );
});
// factories
function buildCourseWithout(key?: Key) {
  const course = new StubClass();
  Object.assign(course, {
    thumbnail: '',
    previewUrl: '',
    duration: 1,
    description: '',
  });
  if (key) {
    delete course[key];
  }
  return course;
}
