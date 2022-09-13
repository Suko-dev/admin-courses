import { GraphqlSortedInput } from '@admin-cursos/types';
import { InputType, registerEnumType } from '@nestjs/graphql';

enum CategorySortProps {
  Name = 'name',
}

registerEnumType(CategorySortProps, { name: 'CategorySortProps' });

@InputType('SortedCategoryInput')
export class SortedCategoryInput extends GraphqlSortedInput(
  CategorySortProps
) {}
