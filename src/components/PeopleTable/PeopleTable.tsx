import { useMemo } from 'react';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';
import classNames from 'classnames';
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const peopleMap = useMemo(() => {
    return Object.fromEntries(people.map(person => [person.name, person]));
  }, [people]);

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
        {people.map(person => {
          const mother = person.motherName
            ? peopleMap[person.motherName]
            : null;
          const father = person.fatherName
            ? peopleMap[person.fatherName]
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : person.fatherName ? (
                  person.fatherName
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
