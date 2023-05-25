import { FC, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const peopleFromServer = await getPeople();

      const peopleWithParents = peopleFromServer.map((person) => {
        const mother = peopleFromServer.find(
          (personMother) => personMother.name === person.motherName,
        );

        const father = peopleFromServer.find(
          (personFather) => personFather.name === person.fatherName,
        );

        return {
          ...person,
          mother,
          father,
        };
      });

      setPeople(peopleWithParents);
    } catch (errorMessage) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && <Loader />}

        {!isLoading && (
          <>
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              {error}
            </p>
            {people.length === 0 && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}
            <PeopleTable people={people} />
          </>
        )}
      </div>
    </div>
  );
};
