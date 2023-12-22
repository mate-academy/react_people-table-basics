import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../../types';

interface Props {
  person: Person,
}

const FEMALE_SEX = 'f';

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={`../${person.slug}`}
    className={cn({ 'has-text-danger': person.sex === FEMALE_SEX })}
  >
    {person.name}
  </Link>
);
