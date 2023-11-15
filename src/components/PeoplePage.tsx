import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonInfo } from './PersonInfo';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const downloadPeople = async () => {
      try {
        setIsLoading(true);
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    downloadPeople();
  }, []);

  let elementToRender;

  switch (true) {
    case (isLoading):
      elementToRender = (
        <Loader />
      );
      break;

    case (hasError):
      elementToRender = (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
      break;

    case (!people?.length):
      elementToRender = (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
      break;

    case (!!people?.length):
      elementToRender = (
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

            {people?.map(person => {
              const mother = people
                .find(p => person.motherName === p.name);
              const father = people
                .find(p => person.fatherName === p.name);

              return (
                <PersonInfo
                  key={person.slug}
                  person={person}
                  mother={mother}
                  father={father}
                />
              );
            })}

          </tbody>
        </table>
      );
      break;

    default:
      break;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {elementToRender}
        </div>
      </div>
    </>
  );
};
