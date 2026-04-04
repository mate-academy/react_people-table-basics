import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PersonLink } from '../personlink/personlink';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeopleTable: React.FC = () => {
  const [person, setPerson] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [serveAlone, setServerAlone] = useState<boolean>(false);

  const getError = (message: string) => setErrorMessage(message);

  useEffect(() => {
    setErrorMessage('');
    setIsloading(true);
    getPeople()
      .then(people => {
        setPerson(people);
        setIsloading(false);
      })
      .catch(() => getError('Something went wrong'))
      .finally(() => setServerAlone(true));
  }, []);

  const { slug } = useParams();
  const selectedUser = slug;

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {errorMessage.length && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {person.length === 0 && serveAlone && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {serveAlone && (
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
            {person.map(p => {
              const mother = person.find(m => m.name === p.motherName);
              const father = person.find(f => f.name === p.fatherName);

              return (
                <tbody key={p.slug}>
                  <tr
                    data-cy="person"
                    className={classNames({
                      'has-background-warning': selectedUser === p.slug,
                    })}
                  >
                    <td>
                      <PersonLink person={p} />
                    </td>
                    <td>{p.sex}</td>
                    <td>{p.born}</td>
                    <td>{p.died}</td>
                    <td>
                      <PersonLink person={mother} name={p.motherName} />
                    </td>

                    <td>
                      <PersonLink person={father} name={p.fatherName} />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
};
