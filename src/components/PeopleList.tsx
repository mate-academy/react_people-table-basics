import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

export const PeopleList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [peopleList, setPeopleList] = useState<Person[] | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        const peopleMap = new Map(data.map(person => [person.name, person]));

        const peopleWithParents = data.map(person => ({
          ...person,
          mother: person.motherName
            ? peopleMap.get(person.motherName)
            : undefined,
          father: person.fatherName
            ? peopleMap.get(person.fatherName)
            : undefined,
        }));

        setPeopleList(peopleWithParents);
      })
      .catch(error => {
        setErrorMessage('Something went wrong');
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {errorMessage && !isLoading && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {!isLoading && peopleList?.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {peopleList && !isLoading && (
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
              {peopleList?.map(person => (
                <PersonLink key={person.slug} person={person} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
