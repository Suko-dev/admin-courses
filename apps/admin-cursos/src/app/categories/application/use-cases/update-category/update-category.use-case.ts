import { fail, succeed } from '@admin-cursos/exceptions';
import { CategoriesRepository } from '../../../domain/repositories';
import { UpdateCategoryMapper } from './update-category-mapper';
import {
  UpdateCategoryInput,
  UpdateCategoryOutput,
} from './update-category.dto';
import { isDefined } from 'class-validator';

export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoriesRepository) {}

  async execute({
    id,
    setActiveTo,
    name,
  }: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    const categoryResult = await this.categoryRepository.findByIdOrFail(id);

    if (categoryResult.isFailure()) {
      return fail(categoryResult.value);
    }

    const category = categoryResult.value;

    if (name) {
      const result = category.update({ name });
      if (result.isFailure()) {
        return fail(result.value);
      }
    }

    if (isDefined(setActiveTo)) {
      setActiveTo ? category.activate() : category.deactivate();
    }

    const saveResult = await this.categoryRepository.save(category);

    if (saveResult.isFailure()) {
      return fail(saveResult.value);
    }

    return succeed(UpdateCategoryMapper.toOutput(category.toJson()));
  }
}
