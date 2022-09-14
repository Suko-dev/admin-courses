import {
  CreateSubCategoryInput,
  CreateSubCategoryOutput,
} from './create-sub-category.dto';
import { fail, succeed } from '@admin-cursos/exceptions';
import { CreateSubCategoryMapper } from './create-sub-category-mapper';
import { SubCategoryFactory } from '../../../domain/entities';
import { SubCategoriesRepository } from '../../../domain/repositories';

export class CreateSubCategoryUseCase {
  constructor(
    private readonly subCategoryRepository: SubCategoriesRepository
  ) {}

  async execute(
    categoryInput: CreateSubCategoryInput
  ): Promise<CreateSubCategoryOutput> {
    const subCategoryResult = SubCategoryFactory.create(categoryInput);

    if (subCategoryResult.isFailure()) {
      return subCategoryResult;
    }

    const subCategory = subCategoryResult.value;
    const saveResult = await this.subCategoryRepository.save(subCategory);

    if (saveResult.isFailure()) {
      return fail(saveResult.value);
    }

    return succeed(CreateSubCategoryMapper.toOutput(subCategory.toJson()));
  }
}
