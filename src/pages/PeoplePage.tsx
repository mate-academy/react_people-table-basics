import { FC, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchPeopleData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const peopleFromServer = await getPeople();
        const peopleWithParents = peopleFromServer.map(person => {
          const mother = peopleFromServer.find(
            item => item.name === person.motherName,
          );
          const father = peopleFromServer.find(
            item => item.name === person.fatherName,
          );

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(peopleWithParents);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeopleData();
  }, []);

  const componentForRender = () => {
    switch (true) {
      case isLoading:
        return <Loader />;
      case isError:
        return (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        );
      case people.length === 0:
        return (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        );
      default:
        return <PeopleTable people={people} />;
    }
  };

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">{componentForRender()}</div>
        </div>
      </div>
    </main>
  );
};
