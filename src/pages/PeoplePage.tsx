/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PersonLink } from '../components/PersonLink';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { slug } = useParams();

  function loadPeople() {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }

  useEffect(loadPeople, []);

  const getParentInfo = (name: string) => {
    const parent = people.find(person => person.name === name);

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return name;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {(!loading && !!errorMessage) && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {(!loading && !!people.length) && (
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
                  const {
                    name, sex, born, died, fatherName, motherName,
                  } = person;

                  return (
                    <tr
                      data-cy="person"
                      key={name}
                      className={classNames({
                        'has-background-warning': person.slug === slug,
                      })}
                    >
                      <td><PersonLink person={person} /></td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      <td>
                        {motherName
                          ? getParentInfo(motherName)
                          : '-'}
                      </td>
                      <td>
                        {fatherName
                          ? getParentInfo(fatherName)
                          : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {(!loading && !errorMessage.length && !people.length) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          ) }
        </div>
      </div>
    </>
  );
};
