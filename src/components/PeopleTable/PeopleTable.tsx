import { FC } from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[],
  isError: boolean,
  selectedSlug: string,
}

export const PeopleTable: FC<Props> = ({
  people,
  isError,
  selectedSlug,
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
          const selectedMother = people.find(({ name }) => name === motherName);
          const selectedFather = people.find(({ name }) => name === fatherName);
          const motherNameCell = motherName || '-';
          const fatherNameCell = fatherName || '-';

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn({
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
                  : motherNameCell}
              </td>

              <td>
                {selectedFather
                  ? <PersonLink person={selectedFather} />
                  : fatherNameCell}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
