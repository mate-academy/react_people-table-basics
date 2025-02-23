import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getUsers } from '../services/people';
import PeopleTable from '../components/Loader/PeopleTable';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getUsers()
      .then((peopleList: Person[]) => {
        setPeople(peopleList);
      })
      .catch(error => setErrorMessage(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {!loading && errorMessage && (
            //   <div className="notification is-danger">{errorMessage}</div>
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !errorMessage && people.length > 0 && (
            <PeopleTable people={people} />
          )}

          {!loading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
