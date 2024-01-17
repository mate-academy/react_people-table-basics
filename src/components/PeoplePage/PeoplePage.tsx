/* eslint-disable max-len */
import React from 'react';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <PeopleTable />
      </div>
    </div>
  );
};
