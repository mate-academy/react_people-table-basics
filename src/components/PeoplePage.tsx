import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from './Loader';
import { Person } from '../types';
import { Errors } from '../types/Errors';

interface Props {
  people: Person[];
  isLoaded: boolean;
  errorMessage: Errors;
}

export const PeoplePage: React.FC<Props> = ({
  people,
  isLoaded,
  errorMessage,
}) => {
  const [isActivePerson, setIsActivePerson] = useState('');

  const handleActivePerson = (slug: string) => {
    setIsActivePerson(slug);
  };

  useEffect(() => {
  });

  const handleMother = (person: Person) => {
    const parent = people.find((p) => p.name === person.motherName);

    if (parent) {
      setIsActivePerson(parent.slug);
    }
  };

  const handleFather = (person: Person) => {
    const parent = people.find((p) => p.name === person.fatherName);

    if (parent) {
      setIsActivePerson(parent.slug);
    }
  };

  return (

    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoaded && (
          <Loader />
        )}

        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errorMessage}
        </p>

        {!people && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

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
            {people.map((person) => (
              <tr
                key={person.slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': person.slug === isActivePerson,
                })}
              >
                <td>
                  <NavLink
                    to={`#/people/${person.slug}`}
                    className={classNames('person',
                      { 'has-text-danger': person.sex === 'f' })}
                    onClick={() => handleActivePerson(person.slug)}
                  >
                    {person.name}
                  </NavLink>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {people.find((p) => person.motherName === p.name) ? (
                    <NavLink
                      to={`#/people/${isActivePerson}`}
                      className="has-text-danger"
                      onClick={() => handleMother(person)}
                    >
                      {person.motherName}
                    </NavLink>
                  ) : (
                    person.motherName
                  )}
                </td>
                <td>
                  {people.find((p) => person.motherName === p.name) ? (
                    <NavLink
                      to={`#/people/${isActivePerson}`}
                      onClick={() => handleFather(person)}
                    >
                      {person.fatherName}
                    </NavLink>
                  ) : (
                    person.fatherName
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
