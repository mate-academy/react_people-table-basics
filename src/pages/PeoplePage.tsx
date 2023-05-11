import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleList } from '../components/Loader/PeopleList/PeopleList';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoaderShow, setIsLoaderShow] = useState(false);
  const { slug = '' } = useParams();

  useEffect(() => {
    setIsLoaderShow(true);

    getPeople()
      .then((fetchedPeople) => {
        setPeople(fetchedPeople);
        setError('');
        setIsLoaderShow(false);
      })
      .catch(() => {
        setError('Cannot load people');
        setIsLoaderShow(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {error ? (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              {error}
            </p>
          ) : (
            <>
              {isLoaderShow ? (
                <Loader />
              ) : (
                <PeopleList
                  people={people}
                  currentElement={slug}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
