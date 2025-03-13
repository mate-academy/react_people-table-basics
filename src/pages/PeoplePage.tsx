import React, { useContext, useEffect } from 'react';
import { PeopleList } from '../components/PeopleList';
import { PeopleContext } from '../store/PeopleContext';

export const PeoplePage: React.FC = () => {
  const { loadPeoples, peoples } = useContext(PeopleContext);

  useEffect(() => {
    loadPeoples();
  }, [loadPeoples]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleList peoples={peoples} />
    </>
  );
};
