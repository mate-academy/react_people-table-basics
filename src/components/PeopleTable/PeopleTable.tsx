import React, { useMemo } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const usersWithParrents = useMemo(() => {
    return people.map(person => {
      return {
        ...person,
        mother: person.motherName
          ? people.find(current => current.name === person.motherName)
          : undefined,
        father: person.fatherName
          ? people.find(current => current.name === person.fatherName)
          : undefined,
      };
    });
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
        {usersWithParrents.map(person => {
          return (
            <tr
              key={person.name}
              data-cy="person"
              className={classNames('', {
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  person.mother ? (
                    <PersonLink person={person.mother} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  person.father ? (
                    <PersonLink person={person.father} />
                  ) : (
                    person.fatherName
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
