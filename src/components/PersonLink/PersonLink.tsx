import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';
import classNames from 'classnames';

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
