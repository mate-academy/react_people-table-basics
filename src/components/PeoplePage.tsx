import { Person } from '../types';
import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api/people';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState(false);
  const { slug } = useParams();

  /* useEffect(() => {
     setIsLoading(true);
     setHasError(false);
     getPeople()
       .then(setPeople)
       .catch(() => setHasError(true))
       .finally(() => setIsLoading(false));
   }, []);*/

   /* useEffect(() => {
     setHasError(false);

     getPeople()
       .then(setPeople)
       .catch(() => {
         setHasError(true);
       })
       .finally(() => {
         setIsLoading(false);
       });
   }, []);*/
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    setTimeout(() => {
      getPeople()
        .then(setPeople)
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    }, 200);
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !hasError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !hasError && people && people.length > 0 && (
            <PeopleTable people={people} selectedSlug={slug} />
          )}
        </div>
      </div>
    </>
  );
};
