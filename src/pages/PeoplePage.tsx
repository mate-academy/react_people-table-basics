import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
// eslint-disable-next-line max-len
import { NoPeopleMessage } from '../components/Loader/NoPeopleMessage/NoPeopleMessage';
import { PeopleList } from '../components/Loader/PeopleList/PeopleList';
// eslint-disable-next-line max-len
import { PeopleLoadingError } from '../components/Loader/PeopleLoadingError/PeopleLoadingError';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => setLoadingError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {loadingError && <PeopleLoadingError />}

          {!loading && !loadingError && people.length === 0 && (
            <NoPeopleMessage />
          )}

          {people.length > 0 && (
            <PeopleList
              people={people}
              selectedPerson={selectedPerson}
              setSelectedPerson={setSelectedPerson}
            />
          )}
        </div>
      </div>
    </>
  );
};
