import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { useParams } from 'react-router-dom';
import { SlugContext } from './SlugContext';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isWrong, setIsWrong] = useState<boolean>(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsWrong(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <SlugContext.Provider value={slug || ''}>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? <Loader /> : <PeopleTable people={people} />}

          {isWrong && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </SlugContext.Provider>
  );
};
