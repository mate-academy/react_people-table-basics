import cn from 'classnames';
import React, { useState } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const preparedPeople = people.map((person) => ({
    ...person,
    mother: people.find((mother) => mother.name === person.motherName),
    father: people.find((father) => father.name === person.fatherName),
  }));

  const [selectedPerson, setSelectedPerson] = useState('');

  return (
    <table
      data-cy="peopleTable"
      className="
        table
        is-striped
        is-hoverable
        is-narrow
        is-fullwidth
      "
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
        {preparedPeople.map((person) => {
          const {
            sex,
            born,
            died,
            slug,
            motherName,
            fatherName,
            mother,
            father,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={cn({
                'has-background-warning': selectedPerson === person.slug,
              })}
            >
              <td>
                <PersonLink
                  onSelectedPerson={setSelectedPerson}
                  person={person}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? (
                  <PersonLink
                    onSelectedPerson={setSelectedPerson}
                    person={mother}
                  />
                ) : (
                  motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink
                    onSelectedPerson={setSelectedPerson}
                    person={father}
                  />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
