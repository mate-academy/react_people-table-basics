import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  isLoading: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
}) => {
  const { personSlug = '' } = useParams();

  if (isLoading) {
    return null;
  }

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
          const getMotherCellData = () => {
            const mother = people.find(personsMother => (
              personsMother.name === person.motherName
            ));

            if (mother) {
              return <PersonLink person={mother} />;
            }

            return person.motherName || '-';
          };

          const getFatherCellData = () => {
            const father = people.find(personsFather => (
              personsFather.name === person.fatherName
            ));

            if (father) {
              return <PersonLink person={father} />;
            }

            return person.fatherName || '-';
          };

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames(
                { 'has-background-warning': person.slug === personSlug },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                { getMotherCellData() }
              </td>
              <td>
                { getFatherCellData() }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
