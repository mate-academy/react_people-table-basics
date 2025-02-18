import React, { useState, useEffect } from 'react';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';

export const Table: React.FC = () => {
  const { personSlug } = useParams();
  const [requestState, setRequestState] = useState('loading');
  const [peopleTable, setPeopleTable] = useState<Person[] | null>(null);

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_people-table/api/people.json');
    getPeople()
      .then((data: Person[]) => {
        if (data.length === 0) {
          return [];
        }
        const treatedData = data.map(e => {
          const motherSlug = data.find(el => el.name === e.motherName)?.slug;
          const fatherSlug = data.find(el => el.name === e.fatherName)?.slug;

          return { ...e, motherSlug: motherSlug, fatherSlug: fatherSlug };
        });

        return treatedData;
      })
      .then(data => {
        setPeopleTable(data);
        setRequestState(data.length === 0 ? 'empty success' : 'success');
      })
      .catch(() => {
        setRequestState('error');
      });
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {requestState.includes('loading') ? (
          <Loader />
        ) : (
          <>
            {requestState.includes('error') && (
              <>
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {' '}
                  Something went wrong
                </p>
                {requestState.includes('empty') && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
              </>
            )}
          </>
        )}

        {requestState.includes('success') && (
          <>
            {requestState.includes('empty') && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
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
                {peopleTable?.map(
                  ({
                    name,
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                    slug,
                    fatherSlug,
                    motherSlug,
                  }) => {
                    return (
                      <tr
                        key={slug}
                        data-cy="person"
                        className={`${slug === personSlug && 'has-background-warning'}`}
                      >
                        <td>
                          <a
                            href={`#/people/${slug}`}
                            className={`${sex === 'f' && 'has-text-danger'}`}
                          >
                            {name}
                          </a>
                        </td>

                        <td>{sex}</td>
                        <td>{born}</td>
                        <td>{died}</td>
                        <td>
                          {motherSlug ? (
                            <a
                              href={`#/people/${motherSlug}`}
                              className={'has-text-danger'}
                            >
                              {motherName}
                            </a>
                          ) : (
                            <span>{motherName || '-'}</span>
                          )}
                        </td>
                        <td>
                          {fatherSlug ? (
                            <a href={`#/people/${fatherSlug}`}>{fatherName}</a>
                          ) : (
                            <span>{fatherName || '-'}</span>
                          )}
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};
