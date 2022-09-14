import { ExpertsRepository } from '../../domain/repositories';
import {
  DuplicatedEntityException,
  EntityNotFoundException,
  fail,
  InternalServerError,
  InvalidIdException,
  Result,
  succeed,
} from '@admin-cursos/exceptions';
import { ListExpertsView } from '../../domain/dtos/list-experts-view';
import { Expert } from '../../domain/entities';

export class InMemoryExpertRepository implements ExpertsRepository {
  inMemoryExperts: Expert[] = [];

  async listExpertsView(): Promise<ListExpertsView[]> {
    return this.inMemoryExperts;
  }

  async findByIdOrFail(
    id: string
  ): Promise<
    Result<
      InternalServerError | EntityNotFoundException | InvalidIdException,
      Expert
    >
  > {
    const expert = this.inMemoryExperts.find((expert) => expert.id === id);

    if (!expert) {
      return fail(new EntityNotFoundException(id, 'expert'));
    }

    return succeed(expert);
  }

  async save(
    expert: Expert | Expert[]
  ): Promise<Result<InternalServerError | DuplicatedEntityException, void>> {
    if (Array.isArray(expert)) {
      const backup = this.inMemoryExperts.slice();
      const results = expert.map(this.saveSingleExpert, this);
      const anyFailure = results.some((result) => result?.isFailure());
      if (anyFailure) {
        this.inMemoryExperts = backup;
        return fail(new InternalServerError());
      }
    } else {
      const result = this.saveSingleExpert(expert);
      if (result?.isFailure()) {
        return fail(result.value);
      }
    }
    return succeed();
  }

  private saveSingleExpert(expert): Result<Error, void> {
    this.inMemoryExperts.push(expert);
    return succeed();
  }
}
