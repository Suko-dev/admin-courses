import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { SortByOrder } from '../../pagination';
import { Type } from '@nestjs/common';
import { StandardEnum } from '../../pagination/enums/standard-enum';
import { SortedInput } from '../../pagination/sorted-input';

registerEnumType(SortByOrder, { name: 'SortByOrder' });

export function GraphqlSortedInput<SortParams extends StandardEnum<unknown>>(
  SortParamsEnum: SortParams
): Type<SortedInput<SortParams>> {
  @InputType({ isAbstract: true })
  abstract class GraphqlSortedInput {
    @Field(() => SortParamsEnum, { nullable: true })
    sortBY?: SortParams;

    @Field(() => SortByOrder, { nullable: true })
    sortOrder: SortByOrder;
  }
  return GraphqlSortedInput as Type<SortedInput<SortParams>>;
}
