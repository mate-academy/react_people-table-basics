import { Link } from 'react-router-dom';
import { Person } from '../types/Person';
import getSlug from '../utils/getSlug';

type Props = {
  name: string;
  people: Person[];
};

const PersonLink = ({ name, people }: Props) => {
  const person = people.find(p => p.name === name);

  if (!name) return <td>-</td>;
  if (!person) return <td>{name}</td>;

  const isWoman = person.sex === 'f';

  return (
    <td>
      <Link
        to={`/people/${getSlug(person)}`}
        className={isWoman ? 'has-text-danger' : ''}
      >
        {name}
      </Link>
    </td>
  );
};

export default PersonLink;
