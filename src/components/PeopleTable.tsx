import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  return (
    people.length === 0 ? (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    ) : (

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
              className={classNames({
                'has-background-warning': person.slug === personSlug,
              })}
            >
              <td>
                <PeopleLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {
                  person.mother
                    ? (
                      <PeopleLink person={person.mother} />
                    )
                    : person.motherName || '-'
                }
              </td>
              <td>
                {person.father
                  ? (
                    <PeopleLink person={person.father} />
                  )
                  : person.fatherName || '-'}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};
