import { FC } from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { tableColumns } from '../../helpers';

interface PeopleTableProps {
  people: Person[];
  selectedPersonSlug: string;
}

export const PeopleTable: FC<PeopleTableProps> = ({
  people,
  selectedPersonSlug,
}) => (
  <div className="block">
    <div className="box table-container">
      {people.length === 0 ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {tableColumns.map((column: string) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {people.map((person: Person) => (
              <tr
                data-cy="person"
                className={
                  selectedPersonSlug === person.slug
                    ? 'has-background-warning'
                    : ''
                }
                key={person.slug}
              >
                <td>
                  <PersonLink person={person} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {person.mother ? (
                    <PersonLink person={person.mother} />
                  ) : (
                    person.motherName || '-'
                  )}
                </td>
                <td>
                  {person.father ? (
                    <PersonLink person={person.father} />
                  ) : (
                    person.fatherName || '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);
