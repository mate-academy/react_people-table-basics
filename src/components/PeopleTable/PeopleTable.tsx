import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

const tableColumns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

interface PeopleTableInterface {
  people: Person[];
  selectedPersonSlug: string;
}

export const PeopleTable: FC<PeopleTableInterface> = ({
  people,
  selectedPersonSlug,
}) => {
  return (
    <div className="block">
      <div className="box table-container">
        {people.length === 0 ? (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        ) : (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {tableColumns.map(column => (
                  <th key={column}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {people.map(person => {
                const {
                  sex,
                  born,
                  died,
                  fatherName,
                  motherName,
                  slug,
                  mother,
                  father,
                } = person;

                const personRowClasses = classNames({
                  'has-background-warning': selectedPersonSlug === slug,
                });

                return (
                  <tr
                    data-cy="person"
                    className={personRowClasses}
                    key={slug}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>
                    <td>
                      {mother
                        ? <PersonLink person={mother} />
                        : motherName || '-'}
                    </td>
                    <td>
                      {father
                        ? <PersonLink person={father} />
                        : fatherName || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
