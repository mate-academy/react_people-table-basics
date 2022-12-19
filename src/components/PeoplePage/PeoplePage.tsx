import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

interface State {
  people: Person[] | null,
  isPeopleLoading: boolean,
  hasPeopleLoadingError: boolean,
}

const initialState: State = {
  people: null,
  isPeopleLoading: false,
  hasPeopleLoadingError: false,
};

export const PeoplePage: React.FC = () => {
  const [state, setState] = useState(initialState);

  const getPeopleFromApi = async () => {
    setState(prevState => ({
      ...prevState,
      isPeopleLoading: true,
    }));

    await getPeople()
      .then(res => {
        const peopleData: Person[] = res.map((person: Person) => {
          const mother = res.find((
            { name: motherName }: Person,
          ) => motherName === person.motherName);

          const father = res.find((
            { name: fatherName }: Person,
          ) => fatherName === person.fatherName);

          if (mother !== undefined && father !== undefined) {
            return {
              ...person,
              mother,
              father,
            };
          }

          if (mother !== undefined) {
            return {
              ...person,
              mother,
            };
          }

          if (father !== undefined) {
            return {
              ...person,
              father,
            };
          }

          return person;
        });

        setState(prevState => ({
          ...prevState,
          people: peopleData,
        }));
      })
      .catch(() => setState(prevState => ({
        ...prevState,
        hasPeopleLoadingError: true,
      })))
      .finally(() => setState(prevState => ({
        ...prevState,
        isPeopleLoading: false,
      })));
  };

  useEffect(() => {
    getPeopleFromApi();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {state.isPeopleLoading && <Loader />}

          {state.hasPeopleLoadingError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {state.people !== null
          && state.people.length === 0
          && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {state.people !== null
          && state.people.length !== 0
          && (
            <PeopleTable people={state.people} />
          )}
        </div>
      </div>
    </>
  );
};
