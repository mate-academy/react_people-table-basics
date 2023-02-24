import classNames from 'classnames';
import React from 'react';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types/Person';

type Props = {
  people: Person[],
  selectedSlug: string,
  isError: boolean,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  isError,
}) => {
  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (!people.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
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
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug,
          } = person;

          const isSelected = slug === selectedSlug;
          const selectedMother = people.find(p => p.name === motherName);
          const selectedFather = people.find(p => p.name === fatherName);
          const motherNameValue = motherName || '-';
          const fatherNameValue = fatherName || '-';

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': isSelected,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {selectedMother
                  ? <PersonLink person={selectedMother} />
                  : motherNameValue}
              </td>

              <td>
                {selectedFather
                  ? <PersonLink person={selectedFather} />
                  : fatherNameValue}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
