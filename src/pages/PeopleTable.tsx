import React, { FC } from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: FC<Props> = ({ people, selectedSlug }) => {
  const findPersonByName = (name: string | null): Person | null => {
    if (!name) {
      return null;
    }

    return people.find(p => p.name === name) || null;
  };

  return (
    <>
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
            {people.map(person => {
              const mother = findPersonByName(person.motherName);
              const father = findPersonByName(person.fatherName);

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
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
                    {mother ? <PersonLink person={mother} /> : (person.motherName || '-')}
                  </td>
                  <td>
                    {father ? <PersonLink person={father} /> : (person.fatherName || '-')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};