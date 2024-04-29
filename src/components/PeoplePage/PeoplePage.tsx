import React, { useContext, useEffect } from 'react';
import { Loader } from '../Loader';
import { DispatchContext, StateContex } from '../../context/reducer';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { SwithchError } from '../../types/switchError';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Sex } from '../../types/Sex';

export const PeoplePage: React.FC = () => {
  const { people, fetch, message } = useContext(StateContex);
  const dispatch = useContext(DispatchContext);

  const checkPeopleFather = (perent: Person, sex: Sex) => {
    switch (sex) {
      case Sex.m:
        return people.find(person => person.name === perent.fatherName);

      case Sex.f:
        return people.find(person => person.name === perent.motherName);
    }
  };

  const { slugName } = useParams();

  useEffect(() => {
    dispatch({ type: 'setFetch' });

    getPeople()
      .then(peoples => {
        dispatch({ type: 'setSwitchError', message: SwithchError.Default });
        dispatch({ type: 'setPeople', payload: peoples });

        dispatch({ type: 'disableFetch' });

        if (!peoples.length) {
          dispatch({ type: 'setSwitchError', message: SwithchError.Empty });
        }

        return peoples;
      })
      .catch(() => {
        dispatch({ type: 'disableFetch' });
        dispatch({ type: 'setSwitchError', message: SwithchError.FetchError });
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {fetch ? (
            <Loader />
          ) : message === SwithchError.Empty ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : message === SwithchError.FetchError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : (
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
                {people.map((p: Person, index) => (
                  <tr
                    key={index}
                    data-cy="person"
                    className={cn({
                      'has-background-warning': p.slug === slugName,
                    })}
                  >
                    <td>
                      <Link
                        to={`${p.slug}`}
                        className={cn({ 'has-text-danger': p.sex === 'f' })}
                      >
                        {p.name}
                      </Link>
                    </td>

                    <td>{p.sex}</td>
                    <td>{p.born}</td>
                    <td>{p.died}</td>

                    {p.motherName ? (
                      <td>
                        {checkPeopleFather(p, Sex.f) ? (
                          <Link
                            to={`${checkPeopleFather(p, Sex.f)?.slug}`}
                            className="has-text-danger"
                          >
                            {p.motherName}
                          </Link>
                        ) : (
                          <p>{p.motherName}</p>
                        )}
                      </td>
                    ) : (
                      <td>-</td>
                    )}

                    {p.fatherName ? (
                      <td>
                        {checkPeopleFather(p, Sex.m) ? (
                          <a
                            href={`#/people/${checkPeopleFather(p, Sex.m)?.slug}`}
                          >
                            {p.fatherName}
                          </a>
                        ) : (
                          <p>{p.fatherName}</p>
                        )}
                      </td>
                    ) : (
                      <td>-</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
