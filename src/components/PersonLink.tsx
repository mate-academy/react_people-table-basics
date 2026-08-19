import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink = ({ person, people }: Props) => {
  const personFromList = people.find(
    personFromPeople => personFromPeople.name === person.name,
  );

  if (!personFromList) {
    return <>{person.name}</>;
  }

  return (
    <Link
      to={`/people/${personFromList.slug}`}
      className={personFromList.sex === 'f' ? 'has-text-danger' : ''}
    >
      {personFromList.name}
    </Link>
  );
};
