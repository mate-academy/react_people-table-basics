import React from 'react';
import { PeopleTable } from '../../components/PeopleTable.tsx';

export const PeoplePage: React.FC = () => {
  return (
    <>
      <h1 className="subtitle">
        People table
      </h1>
      <PeopleTable />
    </>
  );
};
