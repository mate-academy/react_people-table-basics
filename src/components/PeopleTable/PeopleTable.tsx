import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type PeopleTableProps = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<PeopleTableProps> = (
  { people, selectedSlug },
) => (
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
          fatherName,
          motherName,
          slug,
          mother,
          father,
        } = person;

        function renderCellContent(
          parentName: string | null,
          parent: Person | undefined,
        ) {
          if (!parentName) {
            return '-';
          }

          if (parent) {
            return <PersonLink person={parent} />;
          }

          return parentName;
        }

        return (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>{renderCellContent(motherName, mother)}</td>
            <td>{renderCellContent(fatherName, father)}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
