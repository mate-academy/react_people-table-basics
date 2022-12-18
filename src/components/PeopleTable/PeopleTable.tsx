import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonTable } from '../PersonTable';

export const PeopleTable = React.memo(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNotLoaded, setIsNotLoaded] = useState<boolean>(false);
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const { slug = '' } = useParams();

  const getUser = (name: string | null, people: Person[]) => {
    const foundUser = people.find(person => person.name === name);

    return foundUser;
  };

  const updatePeople = (people: Person[]) => {
    return people.map(person => ({
      ...person,
      mother: getUser(person.motherName, people),
      father: getUser(person.fatherName, people),
    }));
  };

  const loadPeople = async () => {
    setIsLoading(true);

    try {
      const response = await getPeople();

      setPeopleFromServer(updatePeople(response));
    } catch {
      setIsNotLoaded(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isNotLoaded
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

          {(!peopleFromServer.length && !isLoading && !isNotLoaded)
            && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

          {(!!peopleFromServer.length && !isLoading)
            && (
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
                  {peopleFromServer.map(person => (
                    <PersonTable
                      person={person}
                      key={person.slug}
                      slug={slug}
                    />
                  ))}
                </tbody>
              </table>
            )}
        </div>
      </div>
    </>
  );
});
