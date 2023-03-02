import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [errorOccured, setErrorOccured] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedPersonSlug, setSelectedPersonSlug] = useState('');

  useEffect(() => {
    getPeople()
      .then(response => {
        setPeopleFromServer(response.map(
          person => {
            const mother
            = response.find(prsn => prsn.name === person.motherName);
            const father
            = response.find(prsn => prsn.name === person.fatherName);

            return { ...person, mother, father };
          },
        ));
        if (response.length < 1) {
          setIsEmpty(true);
          setPeopleFromServer(peopleFromServer);
        }
      })
      .catch(() => {
        setErrorOccured(true);
        setIsEmpty(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorOccured && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!errorOccured && !isEmpty && (
            <PeopleTable
              peopleFromServer={peopleFromServer}
              selectedPersonSlug={selectedPersonSlug}
              setSelectedPersonSlug={setSelectedPersonSlug}
            />
          )}
        </div>
      </div>
    </>
  );
};
