export interface PaginatedResource<T> {
  data: T[];
  meta: PaginationMetadata;
}

export interface PaginationMetadata {
  currentPage: number;
  total: number;
  hasNextPage: boolean | null;
  hasPreviousPage: boolean | null;
  lastPage: number;
}
