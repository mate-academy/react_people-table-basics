import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  name: string | null;
  people: Person[];
};
export const PersonLink: React.FC<Props> = ({ name, people }) => {
  if (!name) {
    return <p>-</p>;
  }

  const findedPerson = people.find(person => person.name === name);

  if (!findedPerson) {
    return <p>{name}</p>;
  }

  const isFemale = findedPerson.sex === 'f';

  return (
    <Link
      to={`/people/${findedPerson.slug}`}
      className={isFemale ? 'has-text-danger' : ''}
    >
      {findedPerson.name}
    </Link>
  );
};
