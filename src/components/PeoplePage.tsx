import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { useParams } from 'react-router-dom';
export const PeoplePage = () => {
  const [peoples, setPeoples] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState(false);

  useEffect(() => {
    setErrorType(false);
    setIsLoading(true);
    getPeople()
      .then(data => setPeoples(data))
      .catch(() => {
        setErrorType(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const { slug } = useParams();

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {errorType && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {peoples.length === 0 && !isLoading && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {peoples.length > 0 && (
              <PeopleTable peoples={peoples} selectedSlug={slug} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
