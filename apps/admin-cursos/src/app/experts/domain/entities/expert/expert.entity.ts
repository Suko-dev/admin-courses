import { Entity, FieldErrors, UniqueId } from '@admin-cursos/domain';
import {
  fail,
  InvalidParametersException,
  Result,
  succeed,
} from '@admin-cursos/exceptions';
import { ExpertValidatorFactory } from '../../validators/expert-validator.factory';
import { UpdateExpertDto } from '../../dtos/update-expert.dto';
import { DateTools } from '@admin-cursos/utils';

export type ExpertProps = {
  name: string;
  about: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export class Expert extends Entity<ExpertProps> {
  constructor(props: ExpertProps, uniqueId?: UniqueId) {
    super(uniqueId);
    this.props = props;
  }

  get name(): string {
    return this.props.name;
  }

  get about(): string {
    return this.props.about;
  }

  get avatar(): string {
    return this.props.avatar;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  static create(
    props: ExpertProps,
    uniqueId?: UniqueId
  ): Result<InvalidParametersException, Expert> {
    const expert = new Expert(props, uniqueId);
    const errors = expert.getPropsErrors(expert.props);

    if (errors) {
      return fail(new InvalidParametersException(errors));
    }

    return succeed(expert);
  }

  public update(
    updateExpertDto: UpdateExpertDto
  ): Result<InvalidParametersException, void> {
    const errors = this.getPropsErrors({ ...this.props, ...updateExpertDto });

    if (errors) {
      return fail(new InvalidParametersException(errors));
    }

    Object.assign(this.props, updateExpertDto);
    this.props.updatedAt = DateTools.now();
    return succeed();
  }

  protected getPropsErrors(props: ExpertProps): FieldErrors | undefined {
    const expertValidator = ExpertValidatorFactory.create();

    const isValid = expertValidator.validate(props);

    if (!isValid) {
      return expertValidator.errors;
    }
  }
}
