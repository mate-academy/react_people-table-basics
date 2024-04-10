import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonItem } from '../PersonItems/PersonItem';
import React from 'react';
import { TableNames } from '../../types/TableNames';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const preparedPeople = people.map(personValue => ({
    ...personValue,
    mother: people.find(human => human.name === personValue.motherName),
    father: people.find(human => human.name === personValue.fatherName),
  }));

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {isError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!preparedPeople.length && !isError && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {!!preparedPeople.length && !isError && (
                  <table
                    data-cy="peopleTable"
                    className="table
                          is-striped
                          is-hoverable is-narrow is-fullwidth"
                  >
                    <thead>
                      <tr>
                        {Object.values(TableNames).map(item => (
                          <th key={item}>{item}</th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {preparedPeople.map(person => (
                        <PersonItem key={person.slug} person={person} />
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
