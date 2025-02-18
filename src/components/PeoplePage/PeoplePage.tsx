import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { PeopleList } from '../PeopleList/PeopleList';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleLoadingError, setPeopleLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setPeopleLoadingError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleList
        people={people}
        peopleLoadingError={peopleLoadingError}
        isLoading={isLoading}
      />
    </>
  );
};
