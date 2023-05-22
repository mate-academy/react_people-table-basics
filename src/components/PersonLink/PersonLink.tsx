import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
};
export const PersonLink: React.FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classnames(
        { 'has-text-danger': person.sex === 'f' },
      )}
    >
      {person.name}
    </Link>
  );
};
