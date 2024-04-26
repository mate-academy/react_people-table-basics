import React from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import {
  usePeopleDispatch,
  usePeopleState,
} from '../components/store/PeopleContext';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';

export const PeoplePage: React.FC = () => {
  const location = useLocation();

  const { people, error, loading } = usePeopleState();
  const dispatch = usePeopleDispatch();

  React.useEffect(() => {
    const currentPath = location.pathname;
    const basePeoplePath = '/people';

    if (currentPath.startsWith(basePeoplePath)) {
      dispatch({
        type: 'SET_ERROR',
        payload: '',
      });
      dispatch({
        type: 'SET_LOADING',
        payload: true,
      });
      getPeople()
        // eslint-disable-next-line
        .then(people => {
          dispatch({
            type: 'SET_PEOPLE',
            payload: people,
          });
          dispatch({
            type: 'SET_LOADING',
            payload: false,
          });
        })
        .catch(() => {
          dispatch({
            type: 'SET_ERROR',
            payload: 'Something went wrong',
          });
        });
    }
  }, []);

  const getSlugByName = (name: string) => {
    const human = people.find(person => person.name === name);

    return human?.slug || null;
  };

  const setNameColor = (sex: string) => {
    if (null) {
      return;
    }

    return cn({
      'has-text-danger': sex === 'f',
      'has-text-success': sex === 'm',
    });
  };

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="block box has-text-danger">
        {error}
      </p>
    );
  } else if (!people.length && !loading) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
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
                {people.map(person => {
                  const {
                    name,
                    sex,
                    born,
                    died,
                    motherName,
                    fatherName,
                    slug,
                  } = person;

                  const motherSlug = motherName
                    ? getSlugByName(motherName)
                    : null;
                  const fatherSlug = fatherName
                    ? getSlugByName(fatherName)
                    : null;

                  return (
                    <tr
                      key={Math.random()}
                      data-cy="person"
                      className={cn({
                        'has-background-warning':
                          slug === location.pathname.slice(8),
                      })}
                    >
                      <td>
                        <Link
                          to={`/people/${slug}`}
                          className={setNameColor(sex)}
                        >
                          {name}
                        </Link>
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      <td>
                        {motherSlug ? (
                          <Link
                            to={`/people/${motherSlug}`}
                            className={setNameColor('f')}
                          >
                            {motherName}
                          </Link>
                        ) : (
                          <p>{motherName ? motherName : '-'}</p>
                        )}
                      </td>
                      <td>
                        {fatherSlug ? (
                          <Link
                            to={`/people/${fatherSlug}`}
                            className={setNameColor('m')}
                          >
                            {fatherName}
                          </Link>
                        ) : (
                          <p>{fatherName ? fatherName : '-'}</p>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {/* <tr data-cy="person" className="has-background-warning">
              <td>
                <a href="#/people/jan-frans-van-brussel-1761">
                  Jan Frans van Brussel
                </a>
              </td>

              <td>m</td>
              <td>1761</td>
              <td>1833</td>
              <td>-</td>

              <td>
                <a href="#/people/jacobus-bernardus-van-brussel-1736">
                  Jacobus Bernardus van Brussel
                </a>
              </td>
            </tr> */}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
