import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const People = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((data: Person[]) => {
        const fullData = data.map(dataItem => {
          const mother = data.find(item => item.name === dataItem.motherName);
          const father = data.find(item => item.name === dataItem.fatherName);

          return {
            ...dataItem,
            mother,
            father,
          };
        });

        setPeople(fullData);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
        setPeople(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {people && people?.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
