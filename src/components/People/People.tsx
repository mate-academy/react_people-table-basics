import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const People = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [customError, setCustomError] = useState(true);

  // const has

  useEffect(() => {
    setCustomError(false);
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setCustomError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (customError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (!people.length) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {people.length > 0 ? (
            <PeopleTable people={people} />
          ) : (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </div>
  );
};
