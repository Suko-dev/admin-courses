import { SortByOrder } from './enums/sort-by-order';

export class PaginateInput<T = Record<string, unknown>> {
  page: number;
  perPage: number;
  orderBy?: keyof T;
  order?: SortByOrder;
}
