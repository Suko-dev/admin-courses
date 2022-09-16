import { fail, succeed } from '@admin-cursos/exceptions';
import { UpdateSubCategoryMapper } from './update-sub-category-mapper';
import {
  UpdateSubCategoryInput,
  UpdateSubCategoryOutput,
} from './update-sub-category.dto';
import { SubCategoriesRepository } from '../../../domain/repositories';
import { UniqueId } from '@admin-cursos/domain';
import { ObjectTools } from '@admin-cursos/utils';
import { isDefined, isNotEmptyObject } from 'class-validator';
import { UpdateSubcategoryDto } from '../../../domain/dtos/update-subcategory.dto';

export class UpdateSubCategoryUseCase {
  constructor(
    private readonly subCategoryRepository: SubCategoriesRepository
  ) {}

  async execute({
    id,
    name,
    mainCategoryId,
    setActiveTo,
  }: UpdateSubCategoryInput): Promise<UpdateSubCategoryOutput> {
    const subCategoryResult = await this.subCategoryRepository.findByIdOrFail(
      id
    );

    if (subCategoryResult.isFailure()) {
      return fail(subCategoryResult.value);
    }

    const subCategory = subCategoryResult.value;

    let categoryId: UniqueId;

    if (mainCategoryId) {
      const uniqueIdResult = UniqueId.create(mainCategoryId);

      if (uniqueIdResult.isFailure()) {
        return fail(uniqueIdResult.value);
      }
      categoryId = uniqueIdResult.value;
    }

    const updateProps = ObjectTools.filterUndefinedKeysOf<UpdateSubcategoryDto>(
      {
        name,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mainCategoryId: categoryId,
      }
    );

    if (isNotEmptyObject(updateProps)) {
      const updateResult = subCategory.update(updateProps);
      if (updateResult.isFailure()) {
        return fail(updateResult.value);
      }
    }

    if (isDefined(setActiveTo)) {
      setActiveTo ? subCategory.activate() : subCategory.deactivate();
    }

    const saveResult = await this.subCategoryRepository.save(subCategory);

    if (saveResult.isFailure()) {
      return fail(saveResult.value);
    }

    return succeed(UpdateSubCategoryMapper.toOutput(subCategory.toJson()));
  }
}
