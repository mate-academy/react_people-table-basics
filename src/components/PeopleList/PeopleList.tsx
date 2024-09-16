import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { preparePeople } from '../../utils/helpers';
import { PeopleTable } from '../PeopleTable/PeopleTable';

enum ErrorMessages {
  SomethingWentWrong = 'Something went wrong',
  NoPeopleOnTheServer = 'There are no people on the server',
}

export const PeopleList: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPeople = await getPeople();
        const preparedPeople = preparePeople(fetchedPeople);

        setPeople(preparedPeople);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadingAndError = !isLoading && isError;
  const shouldRenderTable = !isLoading && !isError && !!people.length;
  const noPeople = !isLoading && !people.length && !isError;

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {loadingAndError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {ErrorMessages.SomethingWentWrong}
          </p>
        )}

        {shouldRenderTable && <PeopleTable people={people} />}

        {noPeople && (
          <p data-cy="noPeopleMessage">{ErrorMessages.NoPeopleOnTheServer}</p>
        )}
      </div>
    </div>
  );
};
