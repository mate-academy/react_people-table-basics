/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import { React, useState } from 'react';
import classNames from 'classnames';
import { PersonRow } from './PersonRow';

const PeopleTable = ({ people }) => {
  const [selectedTr, setSelectedTr] = useState();

  return (
    <table className="table is-bordered" style={{ 'border-collapse': 'collapse' }}>
      <thead>
        <tr className="PeopleRow">
          <th className="PeopleColumn">Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr
            className={classNames('Person', selectedTr === person.slug ? 'is-selected' : '')}
            key={person.slug}
            onClick={() => setSelectedTr(person.slug)}
          >
            <PersonRow person={person} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
