import { UniqueId } from '@admin-cursos/domain';
import {
  fail,
  InvalidIdException,
  InvalidParametersException,
  Result,
} from '@admin-cursos/exceptions';
import { DateTools } from '@admin-cursos/utils';
import { CreateSubCategoryDto } from '../../dtos/create-sub-category.dto';
import { SubCategory } from './sub-category.entity';
import { subCategorySlugify } from '../../../utils/sub-category-slugify';

export class SubCategoryFactory {
  static create({
    id,
    createdAt,
    code,
    updatedAt,
    name,
    deletedAt,
    mainCategoryId,
  }: CreateSubCategoryDto): Result<
    InvalidParametersException | InvalidIdException,
    SubCategory
  > {
    const uniqueId = this.getUniqueId(id);
    const mainCategoryUniqueId = this.buildId(mainCategoryId);

    if (uniqueId instanceof InvalidIdException) {
      return fail(uniqueId);
    }

    if (mainCategoryUniqueId instanceof InvalidIdException) {
      return fail(mainCategoryUniqueId);
    }

    return SubCategory.create(
      {
        name,
        mainCategoryId: mainCategoryUniqueId,
        code: code ?? subCategorySlugify(name),
        createdAt: createdAt ?? DateTools.now(),
        updatedAt: updatedAt ?? DateTools.now(),
        deletedAt: deletedAt || null,
      },
      uniqueId
    );
  }

  private static getUniqueId(
    id?: string
  ): InvalidIdException | UniqueId | undefined {
    if (!id) {
      return;
    }
    return this.buildId(id);
  }

  private static buildId(id: string): InvalidIdException | UniqueId {
    const uniqueIdResult = UniqueId.create(id);
    return uniqueIdResult.value;
  }
}
