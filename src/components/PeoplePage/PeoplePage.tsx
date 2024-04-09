import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleList } from '../PeopleList';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { personId = '' } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        if (people.length === 0) {
          setErrorMessage('There are no people on the server');
        } else {
          setErrorMessage('Something went wrong');
        }
      })
      .finally(() => setIsLoading(false));
  }, [errorMessage]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <PeopleList people={people} personId={personId} />
          )}
          {errorMessage && (
            <p
              data-cy={
                people.length === 0 ? 'noPeopleMessage' : 'peopleLoadingError'
              }
              className={people.length === 0 ? '' : 'has-text-danger'}
            >
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
