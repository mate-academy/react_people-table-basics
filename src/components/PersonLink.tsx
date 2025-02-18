import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  const findPersonByName = (name: string | null) => {
    return people.find(p => p.name === name);
  };

  const mother = findPersonByName(person.motherName);
  const father = findPersonByName(person.fatherName);

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={slug === person.slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          className={person.sex === 'f' ? 'has-text-danger' : ''}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link className={'has-text-danger'} to={`/people/${mother.slug}`}>
            {person.motherName}
          </Link>
        ) : (
          <p>{person.motherName || '-'}</p>
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{person.fatherName}</Link>
        ) : (
          <p>{person.fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};
