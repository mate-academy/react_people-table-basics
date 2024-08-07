import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person as PersonType } from '../../types';
import { Person } from '../Person';

const columnNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const peopleList = await getPeople();

        setPeople(peopleList);
      } catch {
        setErrorMessage('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const findSlug = (parentName: string | null) => {
    return people.find(el => el.name === parentName)?.slug;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isLoading && <Loader />}

          {!isLoading && people.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {columnNames.map(name => (
                    <th key={name}>{name}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {people.map(person => (
                  <Person
                    key={person.slug}
                    person={person}
                    people={people}
                    findSlug={findSlug}
                  />
                ))}
              </tbody>
            </table>
          )}

          {!isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
