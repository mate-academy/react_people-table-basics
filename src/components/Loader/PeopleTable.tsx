import React from 'react';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const findPersonByName = (name?: string | null) =>
    people.find(p => p.name === name);

  return (
    <div className="box table-container">
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
              key={person.slug}
              data-cy="person"
              className={classNames('', {
                'has-background-warning': selectedSlug === person.slug,
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
                  findPersonByName(person.motherName) ? (
                    <PersonLink person={findPersonByName(person.motherName)!} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  findPersonByName(person.fatherName) ? (
                    <PersonLink person={findPersonByName(person.fatherName)!} />
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
