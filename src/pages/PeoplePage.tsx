import { useEffect, useState } from 'react';
import { PersonOmit } from '../types';
import PeopleTable from '../components/PeopleTable';
import { getPeople } from '../services/person';
import { Loader } from '../components/Loader';
import getPreparedPeople from '../utils/getPreparedPeople';

export default function PeoplePage() {
  const [people, setPeople] = useState<PersonOmit[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const preparedPeople = getPreparedPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!loading && people.length > 0 && (
            <PeopleTable people={preparedPeople} />
          )}

          {!loading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
}
