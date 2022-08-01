import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasLoadingError, setLoadingError] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      setLoadingError(false);

      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (error) {
        setLoadingError(true);
      }
    };

    loadPeople();
  });

  return (
    <>
      {!hasLoadingError && (
        <PeopleTable people={people} />
      )}
    </>
  );
};
