import { PaginatedResource } from '@admin-cursos/types';
import { ListSubCategoriesView } from '../../dtos/list-sub-categories-view';

type Input = {
  page: number;
  perPage: number;
};

export abstract class SubCategoryViewRepository {
  abstract listPaginatedSubCategoriesView(
    input?: Input
  ): Promise<PaginatedResource<ListSubCategoriesView>>;
}
