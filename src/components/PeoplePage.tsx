import { People } from './People';
import { PeopleTable } from './PeopleTable';
import React from 'react';

export const PeoplePage: React.FC = () => {
  return (
    <>
      <People />
      <PeopleTable />
    </>
  );
};
