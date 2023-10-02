import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { FEMALE_SEX } from '../../utils/variables';

type Props = {
  person: Person
};

export const PersonLink = ({ person }: Props) => (
  <Link
    to={`../${person?.slug}`}
    className={classNames({
      'has-text-danger': person?.sex === FEMALE_SEX,
    })}
  >
    {person?.name}
  </Link>
);
