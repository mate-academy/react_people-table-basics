import React from 'react';
import './PeopleTablePage.scss';
import { PersonalRow } from '../PersonalRow/PersonalRow';

type Props = {
  peoples: People[]
};

export const PeopleTablePage: React.FC<Props> = ({ peoples }) => {
  return (
    <table className="PeopleTable">
      <thead>
        <tr className="table-header">
          <th className="table-header__title">Name</th>
          <th className="table-header__title">Sex</th>
          <th className="table-header__title">Born</th>
          <th className="table-header__title">Died</th>
          <th className="table-header__title">Mother</th>
          <th className="table-header__title">Father</th>
        </tr>
      </thead>

      <tbody className="table-body">
        {peoples.map(person => (
          <PersonalRow
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
