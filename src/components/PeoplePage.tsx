import { useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Loader } from './Loader';
import React from 'react';

type Person = {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
};

export const PeoplePage = () => {
  const [peopleData, setPeopleData] = useState<Person[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(data => {
        setIsLoading(false);
        setPeopleData(data);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          ) : (
            <PeopleTable people={peopleData} />
          )}
        </div>
      </div>
    </>
  );
};
