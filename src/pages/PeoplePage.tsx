import React from 'react';
import { PeopleList } from '../components/PeopleList';

export const PeoplePage: React.FC = () => {
  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleList />
    </>
  );
};
