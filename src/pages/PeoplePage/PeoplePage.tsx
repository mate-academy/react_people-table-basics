import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import PeopleTable from '../../components/PeopleTable';

const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getPeople()
      .then(data => setPeople(data as Person[]))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const showError = !isLoading && errorMessage;
  const showNoPeopleMessage =
    !isLoading && !errorMessage && people.length === 0;
  const showPeopleTable = !isLoading && !errorMessage && people.length > 0;

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {showError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {showNoPeopleMessage && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {showPeopleTable && <PeopleTable people={people} />}
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
