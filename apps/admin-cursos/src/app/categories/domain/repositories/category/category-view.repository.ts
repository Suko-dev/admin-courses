import { ListCategoriesView } from '../../dtos/list-categories-view';
import { PaginatedResource } from '@admin-cursos/types';

type Input = {
  page: number;
  perPage: number;
};

export abstract class CategoryViewRepository {
  abstract listPaginatedCategoriesView(
    input?: Input
  ): Promise<PaginatedResource<ListCategoriesView>>;
}
