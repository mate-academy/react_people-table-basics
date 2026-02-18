import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { useMemo } from 'react';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const peopleByName = useMemo(() => {
    const map: { [key: string]: Person } = {};

    people.forEach(person => {
      map[person.name] = person;
    });

    return map;
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
          const motherLink = person.motherName
            ? peopleByName[person.motherName]
            : null;
          const fatherLink = person.fatherName
            ? peopleByName[person.fatherName]
            : null;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={slug === person.slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {!person.motherName ? (
                  '-'
                ) : motherLink ? (
                  <PersonLink person={motherLink} />
                ) : (
                  person.motherName
                )}
              </td>
              <td>
                {!person.fatherName ? (
                  '-'
                ) : fatherLink ? (
                  <PersonLink person={fatherLink} />
                ) : (
                  person.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
