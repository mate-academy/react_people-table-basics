import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  setSelectedPerson: (value: string) => void
};

export const PersonLink: React.FC<Props> = ({ person, setSelectedPerson }) => {
  const handleClick = (slug: string) => {
    setSelectedPerson(slug);
  };

  return (
    <Link
      to={`../${person.name}`}
      className={classNames(
        { 'has-text-danger': person.sex === 'f' },
      )}
      onClick={() => handleClick(person.slug)}
    >
      {person.name}
    </Link>
  );
};
