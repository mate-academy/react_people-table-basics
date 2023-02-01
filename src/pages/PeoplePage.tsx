import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types/Person';

export const PeoplePage: FC = () => {
  const { personSlug = '' } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [noPeopleError, setNoPeopleError] = useState(false);
  const [peopleLoadingError, setPeopleLoadingError] = useState(false);

  // eslint-disable-next-line max-len
  const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

  const getPeople = () => {
    const requestUrl = `${BASE_URL}/people`;

    return fetch(requestUrl)
      .then(response => {
        if (!response.ok) {
          setPeopleLoadingError(true);
        }

        return response.json();
      });
  };

  useEffect(() => {
    setIsPeopleLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setNoPeopleError(true))
      .finally(() => setIsPeopleLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isPeopleLoading
            ? <Loader />
            : (
              <PeopleTable
                people={people}
                selectedPersonSlug={personSlug}
              />
            )}

          {peopleLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {noPeopleError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
