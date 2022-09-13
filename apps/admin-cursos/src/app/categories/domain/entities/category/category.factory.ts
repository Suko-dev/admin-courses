import { CreateCategoryDto } from '../../dtos/create-category.dto';
import { UniqueId } from '@admin-cursos/domain';
import { Category } from './category.entity';
import { categorySlugify } from '../../../utils/category-slugify';
import {
  fail,
  InvalidIdException,
  InvalidParametersException,
  Result,
} from '@admin-cursos/exceptions';
import { DateTools } from '@admin-cursos/utils';

export class CategoryFactory {
  static create({
    id,
    createdAt,
    code,
    updatedAt,
    name,
    deletedAt,
  }: CreateCategoryDto): Result<
    InvalidParametersException | InvalidIdException,
    Category
  > {
    const uniqueId = this.buildId(id);

    if (uniqueId instanceof InvalidIdException) {
      return fail(uniqueId);
    }

    return Category.create(
      {
        name,
        code: code ?? categorySlugify(name),
        createdAt: createdAt ?? DateTools.now(),
        updatedAt: updatedAt ?? DateTools.now(),
        deletedAt: deletedAt || null,
      },
      uniqueId
    );
  }

  private static buildId(id: string): InvalidIdException | UniqueId {
    if (!id) {
      return;
    }
    const uniqueIdResult = UniqueId.create(id);
    return uniqueIdResult.value;
  }
}
