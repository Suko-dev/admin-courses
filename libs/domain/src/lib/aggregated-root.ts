import { Entity } from './entity';
import { UniqueId } from './unique-id.vo';

export class AggregatedRoot<T> extends Entity<T> {
  constructor(id?: UniqueId) {
    super(id);
  }
}
