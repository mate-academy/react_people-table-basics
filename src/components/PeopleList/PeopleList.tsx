import React, { useMemo } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

interface Props {
  people: Person[];
}

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { personInfo } = useParams();
  const nameToSlugMap = useMemo(() => {
    const map = new Map<string, Person>();

    people.forEach(person => {
      map.set(person.name, person);
    });

    return map;
  }, [people]);

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="is-striped is-hoverable is-narrow is-fullwidth table"
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
          const { sex, born, died, fatherName, motherName, slug } = person;

          const mother = motherName ? nameToSlugMap.get(motherName) : null;
          const father = fatherName ? nameToSlugMap.get(fatherName) : null;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn({
                'has-background-warning': personInfo === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {motherName ? (
                  mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {fatherName ? (
                  father ? (
                    <PersonLink person={father} />
                  ) : (
                    fatherName
                  )
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
