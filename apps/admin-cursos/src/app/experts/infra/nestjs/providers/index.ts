import { ExpertsRepositoryProvider } from './experts-repository.provider';
import { UpdateExpertUseCaseProvider } from './update-expert-use-case.provider';
import { CreateExpertUseCaseProvider } from './create-expert-use-case.provider';
import { ExpertViewRepositoryProvider } from './expert-view-repository.provider';

export default [
  ExpertsRepositoryProvider,
  UpdateExpertUseCaseProvider,
  CreateExpertUseCaseProvider,
  ExpertViewRepositoryProvider,
];
