import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

const tableColumns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const People = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const peopleNoExist = !isLoading && people.length === 0;
  const peopleDoExist = !isLoading && people.length > 0;

  const getPeopleData = async () => {
    setIsLoading(true);
    try {
      const peopleData = await getPeople();

      const peopleWithParents = peopleData.map(person => {
        const father = peopleData.find(guy => person.fatherName === guy.name);
        const mother = peopleData.find(
          woman => person.motherName === woman.name,
        );

        return {
          ...person,
          father: father,
          mother: mother,
        };
      });

      setPeople(peopleWithParents);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleData();
  }, []);

  const { selected } = useParams<{ selected: string }>();
  const selectedPerson = selected || '';

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peopleNoExist && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {peopleDoExist && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {tableColumns.map(column => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {people.map(person => (
                  <PersonLink
                    key={person.name}
                    person={person}
                    selectedPerson={selectedPerson}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
