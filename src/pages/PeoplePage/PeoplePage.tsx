import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PaopleTable.tsx';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (error) {
        setErrorMessage('Unable to load people');
      }

      setIsLoading(false);
    };

    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {errorMessage && (
            <>
              <p
                data-cy="peopleLoadingError"
                className="has-text-danger"
              >
                Something went wrong
              </p>
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            </>
          )}
          <PeopleTable people={people} />
        </div>
      </div>
    </>
  );
};
