import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../../api';
import { Person } from '../../../types';
import { Loader } from '../../Loader';
import { PeopleTable } from '../../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { slug = '' } = useParams();

  const getPeopleFromServer = async () => {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setIsLoading(false);
      setPeople(peopleFromServer);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading
          ? (<Loader />)
          : (<PeopleTable people={people} selectedSlug={slug} />)}
      </div>
    </div>
  );
};
