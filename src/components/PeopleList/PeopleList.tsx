import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { PeopleContext } from '../../store/PeopleContext';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  peoples: Person[];
};

export const PeopleList: React.FC<Props> = React.memo(({ peoples }) => {
  const { slug } = useParams();
  const { loading, isDataReady } = useContext(PeopleContext);

  const validActivePerson = slug ? slug.toString() : '';

  return (
    <div className="block">
      <div className="box table-container">
        {loading && <Loader />}

        {!loading && isDataReady === true && (
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
              {peoples.map(people => {
                const {
                  name,
                  sex,
                  born,
                  died,
                  fatherName,
                  motherName,
                  mother,
                  father,
                } = people;

                return (
                  <tr
                    data-cy="person"
                    key={people.slug}
                    className={
                      people.slug === validActivePerson
                        ? 'has-background-warning'
                        : ''
                    }
                  >
                    <td>
                      <Link
                        className={sex === 'f' ? 'has-text-danger' : ''}
                        to={`../${people.slug}`}
                      >
                        {name}
                      </Link>
                    </td>

                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>

                    {mother && motherName !== null ? (
                      <td>
                        {motherName !== null ? (
                          <Link
                            className="has-text-danger"
                            to={`../${mother.slug}`}
                          >
                            {motherName}
                          </Link>
                        ) : (
                          '-'
                        )}
                      </td>
                    ) : (
                      <td>{motherName !== null ? motherName : '-'}</td>
                    )}

                    {father && fatherName !== null ? (
                      <td>
                        {fatherName !== null ? (
                          <Link to={`../${father.slug}`}>{fatherName}</Link>
                        ) : (
                          '-'
                        )}
                      </td>
                    ) : (
                      <td>{fatherName !== null ? fatherName : '-'}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {!loading && peoples.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && isDataReady === false && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
      </div>
    </div>
  );
});

PeopleList.displayName = 'PeopleList';
