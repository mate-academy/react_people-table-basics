import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[] | [],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const personExist = (parentName: string | null) => {
    return people.find(p => p.name === parentName);
  };

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
            className={cn({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink
                person={person}
              />
            </td>

            <td>
              {person.sex}
            </td>
            <td>
              {person.born}
            </td>
            <td>
              {person.died}
            </td>
            <td>

              {personExist(person.motherName) ? (
                <PersonLink
                  person={personExist(person.motherName)}
                />
              ) : (
                <p>{person.motherName || '-'}</p>
              )}
            </td>
            <td>
              {personExist(person.fatherName) ? (
                <PersonLink
                  person={personExist(person.fatherName)}
                />
              ) : (
                <p>{person.fatherName || '-'}</p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
