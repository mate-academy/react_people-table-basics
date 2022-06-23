import React, { useEffect, useState } from 'react';
import { PreperedPerson } from '../../react-app-env';
import { PersonRow } from '../personRow/PersonRow';

import './peopleTable.css';

interface Props {
  filteredPeople: PreperedPerson[]
}

export const PeopleTable: React.FC<Props> = ({ filteredPeople }) => {
  const [preparedList, setPreparedLis] = useState<PreperedPerson[]>([]);

  useEffect(() => {
    setPreparedLis(filteredPeople);
  }, []);

  return (
    <>
      <table className="table is-striped">
        <thead>
          <tr>
            <th className="head">name</th>
            <th className="head">sex</th>
            <th className="head">born</th>
            <th className="head">died</th>
            <th className="head">mother</th>
            <th className="head">father</th>
          </tr>
        </thead>
        <tbody>
          {preparedList.map((person: PreperedPerson) => (
            <tr className="Person" key={person.slug}>
              <PersonRow person={person} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

// export const MemoizedPeopleTable = React.memo(PeopleTable);
