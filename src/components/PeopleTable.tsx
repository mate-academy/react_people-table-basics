import React from 'react';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

export interface Person {
  slug: string;
  name: string;
  sex: string;
  born: number;
  died: number;
  motherName?: string;
  fatherName?: string;
}

interface Props {
  people: Person[];
  sortBy: string;
  sortOrder: 'asc' | 'desc' | null;
  onSort: (column: string) => void;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  sortBy,
  sortOrder,
  onSort,
}) => {
  const { personSlug } = useParams();

  const peopleByName = React.useMemo(
    () => new Map(people.map(p => [p.name, p])),
    [people],
  );

  const getSortIcon = (column: string) => {
    if (sortBy !== column) {
      return 'fa-sort';
    }

    return sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-align-items-center">
              Name
              <button
                type="button"
                className="button is-ghost is-small ml-1"
                style={{
                  border: 'none',
                  padding: '0,4px',
                  height: 'auto',
                  color: 'inherit',
                }}
                onClick={() => {
                  onSort('name');
                }}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('name')}`}></i>
                </span>
              </button>
            </span>
          </th>

          <th>Sex</th>
          <th>
            <span className="is-flex is-align-items-center">
              Born
              <button
                type="button"
                className="button is-ghost is-small ml-1"
                style={{
                  border: 'none',
                  padding: '0,4px',
                  height: 'auto',
                  color: 'inherit',
                }}
                onClick={() => {
                  onSort('born');
                }}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('born')}`}></i>
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-align-items-center">
              Died
              <button
                type="button"
                className="button is-ghost is-small ml-1"
                style={{
                  border: 'none',
                  padding: '0,4px',
                  height: 'auto',
                  color: 'inherit',
                }}
                onClick={() => {
                  onSort('died');
                }}
              >
                <span className="icon">
                  <i className={`fas ${getSortIcon('died')}`}></i>
                </span>
              </button>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            className={
              person.slug === personSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person} nameToDisplay={person.name} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                person={peopleByName.get(person.motherName || '') || null}
                nameToDisplay={person.motherName || ''}
              />
            </td>
            <td>
              <PersonLink
                person={peopleByName.get(person.fatherName || '') || null}
                nameToDisplay={person.fatherName || ''}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
