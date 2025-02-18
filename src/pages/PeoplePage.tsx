import React from 'react';
import { PeopleList } from '../components/PeopleList/PeopleList';

export const PeoplePage: React.FC = () => {
  return (
    <>
      <div className="container">
        <h1 className="title">People Page</h1>

        <PeopleList />
      </div>
    </>
  );
};
