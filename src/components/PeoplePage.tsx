import { useEffect } from 'react';
import { usePeople } from '../providers/PeopleProvider';
import { PeoplePageContent } from './PeoplePageContent';

export const PeoplePage = () => {
  const {
    getPeopleWithParents,
    resetPeople,
  } = usePeople();

  useEffect(() => {
    getPeopleWithParents();

    return () => {
      resetPeople();
    };
  }, [getPeopleWithParents, resetPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          <PeoplePageContent />
        </div>
      </div>
    </>
  );
};
