import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type PeoplePageTableProps = {
  people: Person[],
};

export const PeopleTable: React.FC<PeoplePageTableProps> = (
  { people },
) => {
  const { personSlug } = useParams();

  const selectedPerson = useMemo(() => {
    return people.find(person => person.slug === personSlug);
  }, [personSlug, people]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === selectedPerson?.slug,
            })}
          >
            <PersonLink
              person={person}
            />

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother
              ? (
                <PersonLink
                  person={person.mother}
                />
              )
              : (
                <td>
                  {person.motherName
                    ? person.motherName : '-'}
                </td>
              )}
            {person.father
              ? (
                <PersonLink
                  person={person.father}
                />
              )
              : (
                <td>
                  {person.fatherName
                    ? person.fatherName : '-'}
                </td>
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
