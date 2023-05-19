import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { NoPeopleMessage } from '../../components/NoPeopleMessage';
import { PeopleLoadingError } from '../../components/PeopleLoadingError';
import { PeopleTable } from '../../components/PeopleTable';
import { assignParents } from '../../helpers';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [arePeopleLoading, setArePeopleLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const loadPeople = async () => {
    try {
      const peopleFromServer = await getPeople();
      const peopleWithParents = assignParents(peopleFromServer);

      setPeople(peopleWithParents);
    } catch {
      setHasLoadingError(true);
    } finally {
      setArePeopleLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {arePeopleLoading && <Loader />}

          {hasLoadingError && <PeopleLoadingError />}

          {people && (
            people.length ? (
              <PeopleTable
                people={people}
              />
            ) : (
              <NoPeopleMessage />
            )
          )}
        </div>
      </div>
    </>
  );
};
