import React, { useEffect, useState } from 'react';
import { PersonComponent } from '../components/PersonComponent';
import { Person, personFields } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { Errors } from '../types/Errors';

export const PersonList: React.FC = () => {
  const [personList, setPersonList] = useState<Person[]>([]);
  const [isPersonListLoaded, setIsPersonListLoaded] = useState<boolean>(false);
  const [personError, setPersonError] = useState<Errors | null>(null);
  const getParent = (persons: Person[], personName: string | null) => {
    return persons.find(pers => pers.name === personName);
  };

  const getErrorMessageBlock = () =>
    personError === Errors.noPeopleMessage ? (
      <p data-cy="noPeopleMessage">There are no people on the server</p>
    ) : (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );

  const pageContent = () => {
    return personError !== null ? (
      getErrorMessageBlock()
    ) : (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {personFields.map(field => (
              <th key={field}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {personList.map(person => (
            <PersonComponent key={person.name} person={person} />
          ))}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    getPeople()
      .then(persons => {
        if (persons.length === 0) {
          setPersonError(Errors.noPeopleMessage);

          return;
        }

        setPersonError(null);
        const personsWithParents = persons.map(person => {
          const currentPerson = { ...person };

          currentPerson.father = getParent(persons, person.fatherName);
          currentPerson.mother = getParent(persons, person.motherName);

          return currentPerson;
        });

        setPersonList(personsWithParents);
        setIsPersonListLoaded(true);
      })
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .catch(error => {
        setPersonError(error.message);
      })
      .finally(() => {
        setIsPersonListLoaded(true);
      });
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        <h1 className="title">People Page</h1>
        {!isPersonListLoaded ? <Loader /> : pageContent()}
      </div>
    </div>
  );
};
