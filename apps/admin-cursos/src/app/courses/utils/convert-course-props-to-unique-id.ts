import { InvalidParametersException } from '@admin-cursos/exceptions';
import { isDefined, isNotEmptyObject } from 'class-validator';
import { UniqueId } from '@admin-cursos/domain';
import { INVALID_ID_MESSAGE } from '../domain/entities';

type Ids = {
  id?: UniqueId;
  subCategoriesIds: UniqueId[];
  categoryId: UniqueId;
  expertsIds: UniqueId[];
};

type StringIds = {
  id?: string;
  subCategoriesIds?: string[];
  categoryId?: string;
  expertsIds?: string[];
};

export function convertToUniqueIds({
  id,
  expertsIds = [],
  categoryId,
  subCategoriesIds = [],
}: StringIds): [Ids, InvalidParametersException | undefined] {
  const ids: Ids = { subCategoriesIds: [], expertsIds: [] } as unknown as Ids;
  const buildErrors = {};
  let error: InvalidParametersException | undefined;

  if (id) {
    buildId(id, 'id', ids, buildErrors);
  }
  buildManyIds(subCategoriesIds, 'subCategoriesIds', ids, buildErrors);
  buildManyIds(expertsIds, 'expertsIds', ids, buildErrors);
  buildId(categoryId, 'categoryId', ids, buildErrors);

  if (isNotEmptyObject(buildErrors)) {
    error = new InvalidParametersException(buildErrors);
  }
  return [ids, error];
}

function buildId(
  id: string | undefined,
  key: keyof Ids,
  ids: Ids,
  errors: Record<string, string | string[]>
): void {
  if (!id) {
    return;
  }
  const uniqueIdResult = UniqueId.create(id);

  if (uniqueIdResult.isSuccess()) {
    ['subCategoriesIds', 'expertsIds'].includes(key)
      ? (ids[key] as UniqueId[]).push(uniqueIdResult.value)
      : Object.assign(ids, { [key]: uniqueIdResult.value });
  } else {
    ['subCategoriesIds', 'expertsIds'].includes(key)
      ? pushParamError(errors as Record<string, string[]>, id, key)
      : Object.assign(errors, { [key]: INVALID_ID_MESSAGE(id) });
  }
}

function pushParamError(
  errors: Record<string, string[]>,
  id: string,
  key: string
) {
  if (isDefined(errors[key])) {
    errors[key].push(INVALID_ID_MESSAGE(id));
  } else {
    errors[key] = [INVALID_ID_MESSAGE(id)];
  }
}

function buildManyIds(
  manyIds: string[],
  key: keyof Ids,
  ids: Ids,
  errors: Record<string, string | string[]>
): void {
  manyIds.forEach((id) => buildId(id, key, ids, errors));
}
