import { ListExpertsView } from '../../dtos/list-experts-view';

export abstract class ExpertsViewRepository {
  abstract listExpertsView(): Promise<ListExpertsView[]>;
}
