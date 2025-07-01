import { Loader } from '../Loader/Loader';
import { getPeople } from '../../api';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(json => setPeople(json))
      .then(() => setIsLoading(false))
      .catch(() => setError(true));
  }, []);

  // let fragment = {<></>}

  // if (error) {
  //   fragment =
  //     {<p data-cy="peopleLoadingError" className="has-text-danger">
  //       Something went wrong
  //     </p>}

  // } else if (isLoading) {
  //   return <Loader />;
  // } else if (people.length === 0) {
  //   return <p data-cy="noPeopleMessage">There are no people on the server</p>
  // } else {
  //   return <PeopleTable people={people} slug={slug} />
  // }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {error ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : isLoading ? (
            <Loader />
          ) : people.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <PeopleTable people={people} slug={slug} />
          )}
          {}
        </div>
      </div>
    </>
  );
};
