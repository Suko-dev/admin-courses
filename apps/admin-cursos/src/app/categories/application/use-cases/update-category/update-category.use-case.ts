import { fail, succeed } from '@admin-cursos/exceptions';
import { CategoryRepository } from '../../../domain/repositories/category/category.repository';
import { UpdateCategoryMapper } from './update-category-mapper';
import {
  UpdateCategoryInput,
  UpdateCategoryOutput,
} from './update-category.dto';
import { isDefined } from 'class-validator';

export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({
    id,
    isActive,
    name,
  }: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    const categoryResult = await this.categoryRepository.findByIdOrFail(id);

    if (categoryResult.isFailure()) {
      return fail(categoryResult.value);
    }

    const category = categoryResult.value;

    if (name) {
      const result = category.updateName(name);
      if (result.isFailure()) {
        return fail(result.value);
      }
    }

    if (isDefined(isActive)) {
      category.setActive(isActive);
    }

    const saveResult = await this.categoryRepository.save(category);

    if (saveResult.isFailure()) {
      return fail(saveResult.value);
    }

    return succeed(UpdateCategoryMapper.toOutput(category.toJson()));
  }
}
