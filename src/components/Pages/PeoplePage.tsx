import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [people, setPeople] = useState<Person[]>();
  const [errorMessage, setErrorMessage] = useState('');
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getPeople()
      .then((res: Person[]) => {
        setPeople(res);
        setIsLoading(false);
        if (res.length === 0) {
          setErrorMessage('There are no people on the server');
        }
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
        setIsLoading(false);
      });
  }, []);

  const peopleExist = people !== undefined && people.length !== 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!isLoading && errorMessage && !peopleExist && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {peopleExist && <PeopleTable people={people} selectedSlug={slug} />}
        </div>
      </div>
    </>
  );
};
