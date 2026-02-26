import { useEffect, useState } from 'react';

import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { slug } = useParams();
  const selectedPeople = slug;

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    setTimeout(() => {
      axios
        .get('/api/people.json')
        .then(res => {
          setPeople(res.data);
        })
        .catch(() => {
          // console.log('catch');
          setIsError(true);

          setTimeout(() => {
            navigate('/', { replace: true });
          }, 2000);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !isError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && people.length > 0 && (
            <PeopleTable people={people} selectedPeople={selectedPeople} />
          )}
        </div>
      </div>
    </>
  );
};
