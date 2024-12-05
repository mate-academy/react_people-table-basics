import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  person: Person;
  findPerson: (name: string | null) => Person | undefined;
};

export const PersonLink: React.FC<Props> = ({ person, findPerson }) => {
  const { slug } = useParams();

  const mother = findPerson(person.motherName);
  const father = findPerson(person.fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link className="has-text-danger" to={`../${mother?.slug}`}>
            {person.motherName}
          </Link>
        ) : (
          <p>{person.motherName || '-'}</p>
        )}
      </td>
      <td>
        {father ? (
          <Link to={`../${father?.slug}`}>{person.fatherName}</Link>
        ) : (
          <p>{person.fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};
