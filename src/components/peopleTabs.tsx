import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { Person } from '../types';
import { clientGet } from '../utils/fetchClient';
import { Loader } from './Loader';
import { PersonLink } from './personLink';

export const PeopleTabs: React.FC = () => {
  const { personSlug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setIsloading(true);

    clientGet<Person[]>()
      .then(peopleFromServer => {
        if (peopleFromServer) {
          setPeople(peopleFromServer);
        }
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsloading(false));
  }, []);

  const selectedPerson = people.find(person => person.slug === personSlug);

  const isPersonInList = (personName: string) => (
    people.find(person => person.name === personName)
  );

  const getParent = (
    personParent: string,
  ) => {
    const parent = isPersonInList(personParent);

    return parent
      ? <PersonLink person={parent} />
      : personParent;
  };

  return (
    <>
      {errorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errorMessage}
        </p>
      )}

      {(!people.length && !isLoading)
        && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

      {isLoading && <Loader />}

      {(people && !isLoading) && (
        <>
          <h1 className="title">People Page</h1>

          <div className="box table-container">

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
                {people.map(person => (
                  <tr
                    data-cy="person"
                    className={classNames({
                      // eslint-disable-next-line max-len
                      'has-background-warning': selectedPerson?.slug === person.slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.motherName
                        ? getParent(person.motherName)
                        : '-'}
                    </td>
                    <td>
                      {person.fatherName
                        ? getParent(person.fatherName)
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};
