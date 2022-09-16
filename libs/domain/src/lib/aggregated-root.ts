import { Entity } from './entity';
import { UniqueId } from './unique-id.vo';

export abstract class AggregatedRoot<T> extends Entity<T> {
  protected constructor(id?: UniqueId) {
    super(id);
  }
}
