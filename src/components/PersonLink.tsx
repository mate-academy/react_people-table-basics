import { Link } from 'react-router-dom';
import { Person } from '../types/Person'
import classNames from 'classnames';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { sex,slug,name} = person;

  return (
    <Link
      className={classNames(
        { 'has-text-danger': sex === 'f' },
      )}
      to={`../${slug}`}
    >
      {name}
    </Link>
  );
};