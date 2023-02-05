import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { getPeople } from '../api';
import { Loader } from './Loader';
import { Person } from '../types/Person';

type Props = {

};

export const PeoplePage: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeopleList(() => data);
        if (peopleList.length === 0) {
          setIsError(true);
          setErrorText('There are no people on the server');
        }
      })
      .catch(() => {
        setPeopleList([]);
        setIsError(true);
        setErrorText('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getParent = (parentName: string | null) => {
    const parent = peopleList.find(person => person.name === parentName);

    if (!parentName) {
      return '-';
    }

    return parent
      ? (
        <a
          className={cn(
            { 'has-text-danger': parent.sex === 'f' },
          )}
          href="#/people/emma-de-milliano-1876"
        >
          {parentName}
        </a>
      ) : `${parentName}`;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading
            ? <Loader />
            : (
              <>
                <table
                  data-cy="peopleTable"
                  className="table is-striped is-hoverable
                   is-narrow is-fullwidth"
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
                    {peopleList.map(person => (
                      <tr data-cy="person">
                        <td>
                          <a
                            href="#/people/philibert-haverbeke-1907"
                            className={cn(
                              { 'has-text-danger': person.sex === 'f' },
                            )}
                          >
                            {person.name}
                          </a>
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>

                        <td>
                          {getParent(person.motherName)}

                        </td>

                        <td>
                          {getParent(person.fatherName)}

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div
                  data-cy="ErrorNotification"
                  className={cn(
                    'notification', 'is-danger',
                    'is-light', 'has-text-weight-normal',
                    { hidden: !isError },
                  )}
                >
                  <p
                    data-cy="peopleLoadingError"
                    className={cn(
                      'has-text-danger',
                      { hidden: !isError },
                    )}
                  >
                    {errorText}
                  </p>
                </div>
              </>
            )}
        </div>
      </div>
    </>
  );
};
