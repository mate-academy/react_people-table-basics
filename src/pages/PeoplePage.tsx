import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PersonLink } from '../components/PersonLink';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [peopleLoadingError, setPeopleLoadingError] = useState(false);

  const { personId } = useParams();
  const renderTable = !peopleLoading && people && people.length > 0;
  const renderNoPeopleError = !peopleLoading && people && people.length === 0;

  useEffect(() => {
    setPeopleLoadingError(false);
    setPeopleLoading(true);

    getPeople()
      .then((response) => {
        setPeople(response as Person[]);
      })
      .catch(() => setPeopleLoadingError(true))
      .finally(() => setPeopleLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {peopleLoading && <Loader />}

          {peopleLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {renderTable && (
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
                {people.map(person => {
                  let personMother: React.ReactNode = '-';
                  let personFather: React.ReactNode = '-';

                  if (person.motherName) {
                    const mother = people
                      .find(m => m.name === person.motherName);

                    personMother = typeof mother === 'object'
                      ? <PersonLink person={mother} />
                      : person.motherName;
                  }

                  if (person.fatherName) {
                    const father = people
                      .find(f => f.name === person.fatherName);

                    personFather = typeof father === 'object'
                      ? <PersonLink person={father} />
                      : person.fatherName;
                  }

                  return (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={cn(
                        { 'has-background-warning': person.slug === personId },
                      )}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>

                      <td>
                        {personMother}
                      </td>

                      <td>
                        {personFather}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {renderNoPeopleError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>
  );
};
