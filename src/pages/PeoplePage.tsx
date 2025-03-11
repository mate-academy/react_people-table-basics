import { useContext, useEffect } from 'react';
import { PeopleContext } from '../store/PeopleContext';
import { PeopleList } from '../components/PeopleList';

export const PeoplePage = () => {
  const { people, loadPeople } = useContext(PeopleContext);

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleList people={people} />
    </>
  );
};
