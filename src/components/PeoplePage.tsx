import { useCallback, useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { peopleService } from '../utils/peopleService';
import { DispatchContext, StateContext } from '../store/GlobalContextProvider';

export const PeoplePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { people } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const hasError = !loading && errorMessage;
  const hasNoPeople = !loading && !errorMessage && !people.length;
  const showPeople = !loading && !hasError && !hasNoPeople;

  const findParent = useCallback(
    (parentName: string | null, allPeople: Person[]) => {
      if (!parentName || !allPeople) {
        return;
      }

      return allPeople.find(individual => individual.name === parentName);
    },
    [],
  );

  const addParents = useCallback(
    (allPeople: Person[]) => {
      return allPeople.map(individual => {
        return {
          ...individual,
          mother: findParent(individual.motherName, allPeople),
          father: findParent(individual.fatherName, allPeople),
        };
      });
    },
    [findParent],
  );

  const setPeople = useCallback(
    (peopleFromServer: Person[]) => {
      dispatch({ type: 'setPeople', payload: addParents(peopleFromServer) });
    },
    [addParents, dispatch],
  );

  useEffect(() => {
    setTimeout(
      () =>
        peopleService
          .retrievePeople()
          .then(setPeople)
          .catch(() => setErrorMessage('Something went wrong'))
          .finally(() => setLoading(false)),
      100,
    );
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {hasNoPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {showPeople && <PeopleTable />}
        </div>
      </div>
    </div>
  );
};
