import { useLocation } from 'react-router-dom';
import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { pathname } = useLocation();

  return (
    <tbody>
      {people.map(person => {
        const mother = people.find(p => p.name === person.motherName);
        const father = people.find(p => p.name === person.fatherName);

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              pathname === `/people/${person.slug}`
                ? 'has-background-warning'
                : ''
            }
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
              ) : mother === undefined ? (
                `${person.motherName}`
              ) : (
                <PersonLink person={mother} />
              )}
            </td>

            <td>
              {!person.fatherName ? (
                '-'
              ) : father === undefined ? (
                `${person.fatherName}`
              ) : (
                <PersonLink person={father} />
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
