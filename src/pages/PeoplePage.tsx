import React from 'react';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => (
  <>
    <h1 className="title">People Page</h1>

    <div className="block">
      <div className="box table-container">
        <PeopleTable />
      </div>
    </div>
  </>
);
