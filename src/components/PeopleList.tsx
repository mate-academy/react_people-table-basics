import { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';
import { Person } from '../types';
import { Loader } from './Loader';
import { Link, useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const { loading, isDataLoaded } = useContext(PeopleContext);

  const validActivePerson = slug ? slug : '';

  return (
    <div className="block">
      {loading && <Loader />}
      {!isDataLoaded && (
        <>
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>

          <p data-cy="noPeopleMessage">There are no people on the server</p>
        </>
      )}
      `{' '}
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
            {people.map(person => {
              const {
                name,
                sex,
                born,
                died,
                fatherName,
                motherName,
                mother,
                father,
              } = person;

              return (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={
                    person.slug === validActivePerson
                      ? 'has-background-warning'
                      : ''
                  }
                >
                  <td>
                    <Link
                      className={sex === 'f' ? 'has-text-danger' : ''}
                      to={`../${person.slug}`}
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
      </div>
    </div>
  );
};
