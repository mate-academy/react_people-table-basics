import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';
import { ErrorType, Person } from '../../types';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorType | ''>('');

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch((error) => {
        setErrorMessage(ErrorType.LOADING);
        throw error;
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading
            ? <Loader />
            : (
              <>
                {errorMessage && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {errorMessage}
                  </p>
                )}

                {people.length === 0 && !isLoading && (
                  <p data-cy="noPeopleMessage">
                    {ErrorType.NO_DATA}
                  </p>
                )}

                <PeopleTable people={people} slug={slug} />
              </>
            )}
        </div>
      </div>
    </>
  );
};
