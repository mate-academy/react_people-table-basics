import React, { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  selectedSlug: string;
}

export const PeopleTable: FC<Props> = ({ people, selectedSlug }) => {
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
          const personMother
          = people.find(mother => mother.name === person.motherName);
          const personFather
          = people.find(father => father.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames(
                { 'has-background-warning': selectedSlug === person.slug },
              )}
            >
              <td>
                <PersonLink person={person} selectedSlug={person.slug} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {personMother ? (
                  <PersonLink
                    person={personMother}
                    selectedSlug={personMother.slug}
                  />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {personFather ? (
                  <PersonLink
                    person={personFather}
                    selectedSlug={personFather.slug}
                  />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
