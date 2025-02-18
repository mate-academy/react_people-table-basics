import classNames from 'classnames';
import { Person } from '../../../types';
import { Link, useParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { personSlug } = useParams();
  
  const selectedPerson = useMemo(() => {
    return people.find(p => p.slug === personSlug);
  }, [personSlug, people]);

  const getPersonByName = useCallback(
    (name: string | null) => {
      return people.find(p => p.name === name);
    },
    [people]
  );

  const mother = getPersonByName(person.motherName);
  const father = getPersonByName(person.fatherName);

  return (
    <tr
      key={person.slug}
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson?.slug === person.slug,
      })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
          to={`${person.slug}`}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link className="has-text-danger" to={`/people/${mother.slug}`}>
            {person.motherName === null ? '-' : person.motherName}
          </Link>
        ) : (
          <p>{person.motherName === null ? '-' : person.motherName}</p>
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>
            {person.fatherName === null ? '-' : person.fatherName}
          </Link>
        ) : (
          <p>{person.fatherName === null ? '-' : person.fatherName}</p>
        )}
      </td>
    </tr>
  );
};
