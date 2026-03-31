import { useEffect, useState } from 'react';
import { Loader } from './Loader/Loader';
import { Person } from '../types/Person';
import { PeopleTable } from './PeopleTable';
// import { PeopleLink } from './/PeopleLink';

async function getPeople() {
  const response = await fetch(
    'https://mate-academy.github.io/react_people-table/api/people.json',
  );

  if (!response.ok) {
    throw new Error('Network error');
  }

  return response.json();
}

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeopleData(data);
      })
      .catch(err => {
        setError(err.message || 'Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="title">People Page</h1>
        {!loading && error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
        {!loading && peopleData && peopleData.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && peopleData && peopleData.length > 0 && (
          <PeopleTable people={peopleData} />
        )}
        {/* {!loading && peopleData && <PeopleLink />} */}
        {loading && (
          <div className="block">
            <div className="box table-container">
              <Loader />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
