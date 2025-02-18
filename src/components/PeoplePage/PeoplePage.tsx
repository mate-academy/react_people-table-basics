import { Loader } from '../Loader';
import React, { useContext, useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { DispatchContext, StateContext } from '../../Store';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeoplePage: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const state = useContext(StateContext);
  const { people } = state;
  const { personSlug } = useParams();

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(dataPeople => {
        dispatch({
          type: 'setPeople',
          payload: dataPeople,
        });
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  function Parent(parentName: string | null) {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return (
        <Link
          to={`/people/${parent.slug}`}
          className={parent.sex === 'f' ? 'has-text-danger' : ''}
        >
          {parent.name}
        </Link>
      );
    }

    return parentName;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !loading && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length > 0 && !error && !loading && (
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
                {people.map(human => (
                  <tr
                    data-cy="person"
                    key={human.name}
                    className={classNames({
                      'has-background-warning': human.slug === personSlug,
                    })}
                  >
                    <td>
                      <Link
                        to={`/people/${human.slug}`}
                        className={human.sex === 'f' ? 'has-text-danger' : ''}
                      >
                        {human.name}
                      </Link>
                    </td>

                    <td>{human.sex}</td>
                    <td>{human.born}</td>
                    <td>{human.died}</td>
                    <td>{Parent(human.motherName)}</td>
                    <td>{Parent(human.fatherName)}</td>
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
