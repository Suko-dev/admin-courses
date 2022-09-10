import { ValueObject } from '../value-object';

class StubValueObject extends ValueObject<string> {
  static create(value: string) {
    return new StubValueObject(value);
  }

  validate(): boolean {
    return typeof this._value === 'string';
  }
}

describe('ValueObject unit test', () => {
  it('should create a new value object', () => {
    // Act
    const valueObject = StubValueObject.create('');

    // Assert
    expect(valueObject).toBeDefined();
  });

  it('should save the informed object value', () => {
    // Arrange
    const value = 'value object';

    // Act
    const valueObject = StubValueObject.create(value);

    // Assert
    expect(valueObject.value).toEqual(value);
  });

  describe('validate method', () => {
    it('should be defined', () => {
      // Arrange
      const valueObject = StubValueObject.create('value');

      // Assert
      expect(valueObject.validate).toBeDefined();
    });
  });

  describe('toString method', () => {
    it.each([
      ['string value', 'dale', 'dale'],
      ['date value', new Date(), new Date().toString()],
      ['object', { value: 'dale' }, '{"value":"dale"}'],
      ['array', ['dale', 'dale'], 'dale,dale'],
      ['true boolean', true, 'true'],
      ['false boolean', false, 'false'],
      ['number', 10, '10'],
      ['1', 1, '1'],
      ['0', 0, '0'],
    ])(
      'should convert a(n) %s to string',
      (_, value: unknown, stringValue: string) => {
        // Arrange
        const valueObject = StubValueObject.create(value as string);

        // Assert
        expect(`${valueObject}`).toEqual(stringValue);
      }
    );
  });
});
