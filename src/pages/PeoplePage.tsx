import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PersonList } from '../components/PersonList';
import { ErrorMessage } from '../components/ErrorMessage';
import { NoPeopleMessage } from '../components/NoPeopleMessage';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMassage] = useState(false);

  const { slug } = useParams();

  const selectedPersonSlug = slug ? slug : '';

  const canShowNoPeopleMessage = people.length === 0 && !loading;

  const getPeopleWithChildren = (currentPeople: Person[]) => {
    const result = currentPeople.map(person => {
      const human = { ...person };

      human.mother = currentPeople.find(
        onePerson => human.motherName === onePerson.name,
      );

      human.father = currentPeople.find(
        onePerson => human.fatherName === onePerson.name,
      );

      return human;
    });

    return result;
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMassage(true))
      .finally(() => {
        setPeople(current => getPeopleWithChildren(current));
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && <ErrorMessage />}

          {canShowNoPeopleMessage && <NoPeopleMessage />}

          {!loading && (
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

              <PersonList
                people={people}
                selectedPersonSlug={selectedPersonSlug}
              />
            </table>
          )}
        </div>
      </div>
    </>
  );
};
