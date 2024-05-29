import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from './Loader';
import PeopleTable from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(resPeople => setPeople(resPeople))
      .catch(() => setLoadingError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            <Loader />
          </div>
        </div>
      </>
    );
  }

  if (loadingError) {
    return (
      <>
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          </div>
        </div>
      </>
    );
  }

  if (people.length === 0) {
    return (
      <>
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          <PeopleTable people={people} selectedSlug={slug} />
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
