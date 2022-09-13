import { SortByOrder } from '@admin-cursos/types';
import { StandardEnum } from './enums/standard-enum';

export class SortedInput<SortOrder extends StandardEnum<unknown>> {
  sortBY: SortOrder;
  sortOrder?: SortByOrder = SortByOrder.ASC;
}
