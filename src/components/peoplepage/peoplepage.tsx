import React from 'react';

import { PeopleTable } from '../people/people';

export const PeoplePage: React.FC = () => {
  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable />
    </>
  );
};
