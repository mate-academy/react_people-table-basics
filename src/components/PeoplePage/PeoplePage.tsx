import React from 'react';
import { PeopleTable } from '../PeopleTable';
import './PeoplePage.scss';

export const PeoplePage: React.FC = () => {
  return (
    <div className="PeoplePage">
      <h1 className="PeoplePage__title">People page</h1>
      <PeopleTable />
    </div>
  );
};
