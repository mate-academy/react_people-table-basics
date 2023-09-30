import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

const ERROR_MESSAGE = 'Something went wrong';
const NO_PEOPLE_ON_SERVER = 'There are no people on the server';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleWithParents = people.map(person => {
    const mother = people
      .find(personMother => personMother.name === person.motherName);
    const father = people
      .find(personFather => personFather.name === person.fatherName);

    return { ...person, mother, father };
  });

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {ERROR_MESSAGE}
              </p>
            )}

            {people.length === 0 && !isLoading && (
              <p data-cy="noPeopleMessage">
                {NO_PEOPLE_ON_SERVER}
              </p>
            )}

            {people.length > 0 && (
              <PeopleTable people={peopleWithParents} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
