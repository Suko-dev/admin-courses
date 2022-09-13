import { fail, succeed } from '@admin-cursos/exceptions';
import { UpdateSubCategoryMapper } from './update-sub-category-mapper';
import {
  UpdateSubCategoryInput,
  UpdateSubCategoryOutput,
} from './update-sub-category.dto';
import { isDefined } from 'class-validator';
import { SubCategoryRepository } from '../../../domain/repositories';
import { UniqueId } from '@admin-cursos/domain';

export class UpdateSubCategoryUseCase {
  constructor(private readonly subCategoryRepository: SubCategoryRepository) {}

  // todo: funções privadas
  async execute({
    id,
    isActive,
    name,
    mainCategoryId,
  }: UpdateSubCategoryInput): Promise<UpdateSubCategoryOutput> {
    const subCategoryResult = await this.subCategoryRepository.findByIdOrFail(
      id
    );

    if (subCategoryResult.isFailure()) {
      return fail(subCategoryResult.value);
    }

    const subCategory = subCategoryResult.value;

    if (name) {
      const updateResult = subCategory.updateName(name);
      if (updateResult.isFailure()) {
        return fail(updateResult.value);
      }
    }

    if (mainCategoryId) {
      const uniqueIdResult = UniqueId.create(mainCategoryId);

      if (uniqueIdResult.isFailure()) {
        return fail(uniqueIdResult.value);
      }

      const updateResult = subCategory.updateMainCategoryId(
        uniqueIdResult.value
      );

      if (updateResult.isFailure()) {
        return fail(updateResult.value);
      }
    }

    if (isDefined(isActive)) {
      subCategory.setActive(isActive);
    }

    const saveResult = await this.subCategoryRepository.save(subCategory);

    if (saveResult.isFailure()) {
      return fail(saveResult.value);
    }

    return succeed(UpdateSubCategoryMapper.toOutput(subCategory.toJson()));
  }
}
