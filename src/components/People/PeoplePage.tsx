import { useContext, useEffect } from 'react';
import { PeopleContent } from './PeopleContent';
import { appContext } from '../../storage/AppContext/AppContext';

export const PeoplePage = () => {
  const { fetchPeople } = useContext(appContext);

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <PeopleContent />
      </div>
    </>
  );
};
