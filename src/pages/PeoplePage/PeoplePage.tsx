import { useEffect, useState } from 'react';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, [setPeople]);

  return (
    <div className="container">
      <div className="block">
        <div className="box table-container">
          <h1 className="title">People Page</h1>

          {loading && (<Loader />)}

          {!loading && !errorMessage && (<PeopleTable people={people} />)}

          {!loading && !!errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>

  );
};
