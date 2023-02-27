import { memo } from 'react';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[],
  selectedSlug: string,
  errorMessage: boolean,
}

const headers = [
  { id: 1, title: 'Name' },
  { id: 2, title: 'Sex' },
  { id: 3, title: 'Born' },
  { id: 4, title: 'Died' },
  { id: 5, title: 'Mother' },
  { id: 6, title: 'Father' },
];

export const PeopleTable: React.FC<Props> = memo(({
  people,
  selectedSlug,
  errorMessage,
}) => {
  if (errorMessage) {
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
          {headers.map(header => <th key={header.id}>{header.title}</th>)}
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

          const hasSelected = slug === selectedSlug;
          const selectedMother = people.find(p => p.name === motherName);
          const selectedFather = people.find(p => p.name === fatherName);
          const motherNameCell = motherName || '-';
          const fatherNameCell = fatherName || '-';

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': hasSelected,
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
});
