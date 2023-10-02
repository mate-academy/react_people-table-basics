import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleContext } from '../../PeopleContext';
import { columnNames } from '../../utils/constants';
import { PersonRow } from './PersonRow';

export const PeopleTable: React.FC = () => {
  const { peopleList } = useContext(PeopleContext);
  const { peopleSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columnNames.map(columnName => (
            <th key={columnName}>{columnName}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {peopleList.map(person => (
          <PersonRow
            person={person}
            peopleSlug={peopleSlug}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
