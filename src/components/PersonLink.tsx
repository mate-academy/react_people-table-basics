import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  person: Person,
  setSelectedPerson: (selectedPerson: string) => void;
}

export const PersonLink: React.FC<Props> = ({
  person,
  setSelectedPerson,
}) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      onClick={() => setSelectedPerson(person.slug)}
    >
      {person.name}
    </Link>
  );
};
