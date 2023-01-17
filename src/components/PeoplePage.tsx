import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage:
React.FC<{}> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isListEmpty, setIsListEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const getPeople = async () => {
      try {
        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json', {
            method: 'GET',
          },
        );

        const result = await response.json();

        setPeople(result);
        setIsLoading(false);
        if (result.length === 0) {
          setIsListEmpty(true);
        } else {
          setIsListEmpty(false);
        }
      } catch (err) {
        setIsError(true);
        setIsListEmpty(false);
        setIsLoading(false);
      }
    };

    getPeople();
  }, []);

  return (
    <div className="PeoplePage" data-cy="peoplePage">
      <h1 className="title">People Page</h1>
      <div className="container">

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}
            {isListEmpty && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}
            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!isListEmpty && !isError && !isLoading && (
              <PeopleTable
                people={people}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
