import React from 'react';
import { Person } from '../../types';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';

type PeopleTableProps = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedSlug,
}) => {
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
        {people?.map(person => {
          const motherExist = people.find(
            pers => pers.name === person.motherName,
          );
          const fatherExist = people.find(
            pers => pers.name === person.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === selectedSlug,
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
                  motherExist ? (
                    <PersonLink person={motherExist} />
                  ) : (
                    <span className="has-text-danger">{person.motherName}</span>
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  fatherExist ? (
                    <PersonLink person={fatherExist} />
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
