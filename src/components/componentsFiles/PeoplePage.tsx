import React, { useEffect, useState } from 'react';
import { TableOfPeople } from './Table/TableOfPeople';
import { Loader } from '../Loader/Loader';
import { SomethingWrong } from './ErrorMessages/SomethingWrong';
import { NoPeopleOnServer } from './ErrorMessages/NoPeopleOnServer';
import { Person } from '../../types';

import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []); //я невпевнений чи правильно дістаю список людей, але нехай буде поки так. можливо ші щось підкаже

  return (
    <div>
      {isLoading === true ? (
        <Loader />
      ) : errorMessage !== '' ? (
        <SomethingWrong />
      ) : people.length === 0 ? (
        <NoPeopleOnServer />
      ) : (
        <div>
          <h1 className="title">People Page</h1>
          <TableOfPeople people={people} />
        </div>
      )}
    </div>
  );
};
