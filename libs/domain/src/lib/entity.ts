import { UniqueId } from './unique-id.vo';

export abstract class Entity<T> {
  protected props: T;

  protected constructor(id?: UniqueId) {
    this._id = id ?? <UniqueId>UniqueId.create().value;
  }

  protected _id: UniqueId;

  get id(): string {
    return this._id.value;
  }

  toJson(): Required<{ id: string } & T> {
    return { ...this.props, id: this.id } as Required<{ id: string } & T>;
  }
}
