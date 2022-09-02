import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const { personSlug = '' } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errMessage, setErrMessage] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrMessage(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {errMessage && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {errMessage === false
            && isLoading === false
            && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoading && people.length < 1
            ? <Loader />
            : (
              <PeopleTable
                people={people}
                selectedSlug={personSlug}
              />
            )}
        </div>
      </div>
    </>
  );
};
