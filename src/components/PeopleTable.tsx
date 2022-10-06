import classNames from 'classnames';
import React from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person [];
  selectedPerson: string;
  isLoader: boolean;
  messageError: string;
  isError: boolean;

};

export const PeopleTable:React.FC <Props> = ({
  people,
  selectedPerson,
  isLoader,
  messageError,
  isError,
}) => {
  const isSelected = (person: Person) => person.slug === selectedPerson;
  const personByName = (personName: string | null) => {
    return people.find(person1 => person1.name === personName);
  };

  return (
    <div className="block">
      <div className="box table-container">

        {isLoader && (<Loader />)}

        { messageError !== '' && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {messageError}
          </p>
        )}
        { !isError && people?.length > 0
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
                {people.length > 0
                  && people.map(person => {
                    const {
                      name,
                      sex,
                      born,
                      died,
                      fatherName,
                      motherName,
                      slug,
                    } = person;

                    return (
                      <tr
                        data-cy="person"
                        key={slug}
                        className={classNames(
                          { 'has-background-warning': isSelected(person) },
                        )}
                      >
                        <PersonLink
                          name={name}
                          person={personByName(name)}
                        />

                        <td>{sex}</td>
                        <td>{born}</td>
                        <td>{died}</td>
                        <PersonLink
                          name={motherName}
                          person={personByName(motherName)}
                        />
                        <PersonLink
                          name={fatherName}
                          person={personByName(fatherName)}
                        />
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}

        {!isError && people.length === 0
         && (
           <p data-cy="noPeopleMessage">
             There are no people on the server
           </p>
         )}
      </div>
    </div>
  );
};
