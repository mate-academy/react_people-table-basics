import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { addParentsToPeople } from '../utils/addParentsToPeople';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { slug } = useParams<{ slug?: string }>();

  const hasPeople = people.length > 0;

  useEffect(() => {
    setErrorMessage(null);
    getPeople()
      .then(peopleFromServer => {
        const peopleWithParents = addParentsToPeople(peopleFromServer);

        setPeople(peopleWithParents);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!isLoading && !errorMessage && !hasPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !errorMessage && hasPeople && (
            <PeopleTable people={people} selectedSlug={slug} />
          )}
        </div>
      </div>
    </>
  );
};
