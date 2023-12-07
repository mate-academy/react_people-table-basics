import * as R from 'react';

import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: R.FC = () => {
  const [people, setPeople] = R.useState<Person[]>([]);
  const [isLoading, setIsLoading] = R.useState(true);
  const [errMsg, setErrMsg] = R.useState('');

  R.useEffect(() => {
    setErrMsg('');

    getPeople()
      .then((peopleFromServer: Person[]) => {
        peopleFromServer.forEach((p: Person, i: number, arr: Person[]) => {
          const person = arr[i];

          person.father = arr.find((perent) => perent.name === p.fatherName);
          person.mother = arr.find((perent) => perent.name === p.motherName);
        });

        setPeople(peopleFromServer);
      })
      .catch(() => setErrMsg('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errMsg && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errMsg}
            </p>
          )}

          {!isLoading && !errMsg && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && !errMsg && !!people.length && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
