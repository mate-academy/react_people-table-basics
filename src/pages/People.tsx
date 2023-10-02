/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import PeopleTable from '../components/PeopleTable/PeopleTabe';
import { Person } from '../types';

function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPeople()
      .then((data) => {
        setPeople(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people.length === 0) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable people={people} />
    </>
  );
}

export default PeoplePage;
