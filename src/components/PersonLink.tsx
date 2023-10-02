import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

const FEMALE = 'f';
const FEMALE_COLOR = 'has-text-danger';
const MALE_COLOR = 'has-text-link';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={person.slug}
    className={cn({
      [person.sex === FEMALE ? FEMALE_COLOR : MALE_COLOR]: true,
    })}
  >
    {person.name}
  </Link>
);
