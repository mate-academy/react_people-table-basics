import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(people => {
        let allPeople = [...people];
        const updatePeople = [...allPeople];

        updatePeople.forEach(person => {
          const currentPersonIndex = allPeople.findIndex(
            eachPerson => eachPerson.name === person.name,
          );

          const mother = updatePeople.find(
            one => one.name === person.motherName,
          );
          const father = updatePeople.find(
            one => one.name === person.fatherName,
          );

          if (mother) {
            allPeople[currentPersonIndex] = {
              ...allPeople[currentPersonIndex],
              mother,
            };
          }
          if (father) {
            allPeople[currentPersonIndex] = {
              ...allPeople[currentPersonIndex],
              father,
            };
          }
          if (father || mother) {
            allPeople.splice(
              currentPersonIndex,
              1,
              allPeople[currentPersonIndex],
            );
          }
        });

        setPeople(allPeople);
      })
      .catch(() => {
        setError(true);
        console.log('error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && !loading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!error && !loading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!error && !loading && !!people.length && (
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
                  return <PersonLink person={person} key={person.name} />;
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
