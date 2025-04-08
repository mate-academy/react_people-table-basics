import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PersonTableRow } from '../components/PersonTableRow';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const fetchPeoples = async () => {
    try {
      setIsError(false);
      const data: Person[] = await getPeople();

      if (!data) {
        throw new Error('false get');
      }

      const peopleWithParents = data.map((person: Person) => {
        const updatedPerson = { ...person };

        data.forEach(parent => {
          if (parent.name === person.fatherName) {
            updatedPerson.father = parent;
          }

          if (parent.name === person.motherName) {
            updatedPerson.mother = parent;
          }
        });

        return updatedPerson;
      });

      setPeopleList(peopleWithParents);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeoples();
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && !isError && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
        {!isError && !isLoading && peopleList.length < 1 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
        {!isError && !isLoading && peopleList.length > 0 && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {peopleList.map(person => (
                <PersonTableRow person={person} key={person.slug} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
