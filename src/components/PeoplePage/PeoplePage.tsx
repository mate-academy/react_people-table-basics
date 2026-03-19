import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getData } from '../../api/fetchData';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getData()
      .then(response => {
        const handledPeople = response.map(i => {
          return {
            ...i,
            mother: response.find(parent => parent.name === i.motherName),
            father: response.find(parent => parent.name === i.fatherName),
          };
        });

        setPeoples(handledPeople);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!isLoading &&
            (peoples.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              <PeopleTable peoples={peoples} />
            ))}
        </div>
      </div>
    </>
  );
};
