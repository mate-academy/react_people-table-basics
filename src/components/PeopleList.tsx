import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { getPreparedPeople } from '../utils';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // const getPreparedPeople = (loadedPeople: Person[]) => {
  //   return loadedPeople.map(person => {
  //     return {
  //       ...person,
  //       mother: people
  //         .find(person1 => person1.name === person.motherName),
  //       father: people
  //         .find(person1 => person1.name === person.fatherName),
  //     };
  //   });
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setLoadingError(`Something went wrong: ${error.message}`);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []);

  const preparedPeople = getPreparedPeople(people);

  const emptyData = isLoaded && people.length < 1 && !(loadingError.length > 0);
  const failedFetch = loadingError.length > 0;
  const columnNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {failedFetch && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              {loadingError}
            </p>
          )}

          {emptyData && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {!isLoaded ? <Loader /> : (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {columnNames.map(text => <th>{text}</th>)}
                </tr>
              </thead>
              <tbody>
                {preparedPeople.map(person => (
                  <PersonRow
                    key={person.slug}
                    person={person}
                  />
                ))}

              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
