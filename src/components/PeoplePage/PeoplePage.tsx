import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Person } from '../../types';

import { PeopleTable } from '../PeopleTable/PeopleTable';

import { Loader } from '../Loader/Loader';

import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        const peopleWithFatherAndMotherData = peopleFromServer.map(person => ({
          ...person,
          mother: peopleFromServer
            .find(somebodyName => person.motherName === somebodyName.name),
          father: peopleFromServer
            .find(somebodyName => person.fatherName === somebodyName.name),

        }));

        if (peopleWithFatherAndMotherData.length === 0) {
          setError('There are no people on the server');
        }

        setPeople(peopleWithFatherAndMotherData);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const { selectedPersonSlug = 'carolus-haverbeke-1832' } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {!isLoading
            && (
              <PeopleTable
                people={people}
                selectedPersonSlug={selectedPersonSlug}
                error={error}
              />
            )}
        </div>
      </div>
    </>
  );
};
