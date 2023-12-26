import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
}
const PERSON_FEMALE = 'f';

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { name, slug, sex } = person;

  return (
    <Link
      className={cn({ 'has-text-danger': sex === PERSON_FEMALE })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
