import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';

interface Props {
  person?: Person;
  personName?: string | null;
  people: Person[];
}

export const PersonLink: React.FC<Props> = ({ person, personName, people }) => {
  const currentPerson = person || people.find(p => p.name === personName);

  if (!currentPerson) {
    return <span>{personName}</span>;
  }

  return (
    <Link
      to={`/people/${currentPerson.slug}`}
      className={classNames({
        'has-text-danger': currentPerson.sex === 'f',
      })}
    >
      {currentPerson.name}
    </Link>
  );
};
