import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Errors } from '../types/Errors';
import { Person } from '../types';
import { getPeople } from '../api';

export function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.Default);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(Errors.UnableLoad))
      .finally(() => setIsLoading(false));
  }, []);

  function getPreparedPeople(allPeople: Person[]) {
    const preparedPeople = allPeople.map(person => ({
      ...person,
      mother: allPeople.find(mother => mother.name === person.motherName),
      father: allPeople.find(father => father.name === person.fatherName),
    }));

    return preparedPeople;
  }

  const noPeople = people.length === 0;
  const conditionToShowNoPeopleMessage =
    noPeople && errorMessage !== Errors.UnableLoad && !isLoading;
  const preparedPeople = getPreparedPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage === Errors.UnableLoad && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {conditionToShowNoPeopleMessage && (
            <p data-cy="noPeopleMessage">{Errors.noPeopleMessage}</p>
          )}
          {!isLoading && errorMessage !== Errors.UnableLoad && (
            <PeopleTable preparedPeople={preparedPeople} />
          )}
        </div>
      </div>
    </>
  );
}
