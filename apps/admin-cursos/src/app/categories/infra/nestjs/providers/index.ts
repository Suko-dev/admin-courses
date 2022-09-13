import { CategoryRepositoryProvider } from './category-repository.provider';
import { UpdateCategoryUseCaseProvider } from './update-category-use-case.provider';
import { CreateCategoryUseCaseProvider } from './create-category-use-case.provider';
import { CategoryViewRepositoryProvider } from './category-view-repository.provider';
import { SubCategoryRepositoryProvider } from './sub-category-repository.provider';
import { SubCategoryViewRepositoryProvider } from './sub-category-view-repository.provider';
import { CreateSubCategoryUseCaseProvider } from './create-sub-category-use-case.provider';
import { UpdateSubCategoryUseCaseProvider } from './update-sub-category-use-case.provider';

export default [
  CategoryRepositoryProvider,
  UpdateCategoryUseCaseProvider,
  CreateCategoryUseCaseProvider,
  CategoryViewRepositoryProvider,
  SubCategoryRepositoryProvider,
  SubCategoryViewRepositoryProvider,
  CreateSubCategoryUseCaseProvider,
  UpdateSubCategoryUseCaseProvider,
];
