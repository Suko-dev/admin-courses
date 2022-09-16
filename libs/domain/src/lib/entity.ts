import { UniqueId } from './unique-id.vo';
import { EntityValidator, FieldErrors } from './validators';

export abstract class Entity<T> {
  protected props: T;

  protected constructor(id?: UniqueId) {
    this._id = id ?? <UniqueId>UniqueId.create().value;
  }

  protected _id: UniqueId;

  get id(): string {
    return this._id.value;
  }

  // todo: pensar em casos de objetos de valor internos
  toJson(): Required<{ id: string } & T> {
    return { ...this.props, id: this.id } as Required<{ id: string } & T>;
  }

  protected getPropsErrors(props: T): FieldErrors | undefined {
    const entityValidator = this.getPropsValidator();
    const isValid = entityValidator.validate(props);

    if (!isValid) {
      return entityValidator.errors;
    }
  }

  protected abstract getPropsValidator(): EntityValidator;
}
