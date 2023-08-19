import { useEffect, useState, useMemo } from 'react';
import { Loader, PeopleTable } from '../../components';
import { getPeople } from '../../api';
import { Person } from '../../types';

const findParents = (people: Person []) => {
  return people.map(person => {
    const mother = people
      .find(p => p.name === person.motherName);
    const father = people
      .find(p => p.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person []>([]);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = useMemo(() => findParents(people), [people]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong. Please try again later.
      </p>
    );
  }

  if (!people.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          <PeopleTable
            people={preparedPeople}
          />
        </div>
      </div>
    </>
  );
};
