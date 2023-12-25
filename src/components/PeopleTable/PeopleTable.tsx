import { useEffect } from 'react';
import { usePeopleContext } from '../../contexts/PeopleContext';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PeopleLoadingError } from '../../pages/PeopleLoadingError';
import { NoPeopleMessage } from '../../pages/NoPeopleMessage';
import { PersonTableRow } from '../PersonTableRow/PersonTableRow';

export const PeopleTable = () => {
  const {
    people,
    isLoading,
    hasError,
    setPeople,
    setIsLoading,
    setHasError,
  } = usePeopleContext();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [setIsLoading, setHasError, setPeople]);

  const successRender = !isLoading && !hasError;
  const noPeopleRender = !isLoading && !people.length;

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}
        {hasError && <PeopleLoadingError />}
        {noPeopleRender && <NoPeopleMessage />}

        {successRender && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {people.map(person => (
                <PersonTableRow
                  key={person.slug}
                  person={person}
                />
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
};
