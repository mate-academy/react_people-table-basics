import { useState, useEffect } from 'react';

import { PageTitle } from '../../components/PageTitle';
import { PeopleTable } from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';

import { getPeople } from '../../api';
import { Person } from '../../types';
import { getPreparedPeople } from '../../tools/getPreparedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [arePeopleLoading, setArePeopleLoading] = useState(true);
  const [arePeopleLoaded, setArePeopleLoaded] = useState(false);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = getPreparedPeople(peopleFromServer);

        setPeople(preparedPeople);
        setArePeopleLoaded(true);
      })
      .catch(() => {
        setLoadError(true);
      })
      .finally(() => setArePeopleLoading(false));
  }, []);

  return (
    <>
      <PageTitle title="People Page" />
      <div className="block">
        <div className="box table-container">
          {loadError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(arePeopleLoaded && people.length === 0) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {arePeopleLoading && <Loader />}

          {(people.length !== 0 && <PeopleTable people={people} />)}
        </div>
      </div>
    </>
  );
};
