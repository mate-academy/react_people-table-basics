import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[];
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ people, person }) => {
  const getPersonSlug = (name: string | null) => {
    if (!name) {
      return;
    }

    const pers = people.find(item => name === item.name);

    if (!pers) {
      return;
    }

    return pers.slug;
  };

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={slug === person.slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={person.slug}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {getPersonSlug(person.motherName) ? (
        <td>
          <Link
            to={getPersonSlug(person.motherName) || '/'}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        </td>
      ) : (
        <td>{person.motherName ? person.motherName : '-'}</td>
      )}

      {getPersonSlug(person.fatherName) ? (
        <td>
          <Link to={getPersonSlug(person.fatherName) || '/'}>
            {person.fatherName}
          </Link>
        </td>
      ) : (
        <td>{person.fatherName ? person.fatherName : '-'}</td>
      )}
    </tr>
  );
};
