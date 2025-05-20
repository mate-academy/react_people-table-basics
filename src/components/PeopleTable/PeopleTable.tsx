/* eslint-disable prettier/prettier */
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { ErrorMessage } from '../../types/ErrorMessage';

type Props = {
  people: Person[];
  isLoading: boolean;
  errorMessage: ErrorMessage | null;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  errorMessage,
}) => {
  const { slug } = useParams();
  const currentPerson = people?.find(person => person.slug === slug);
  const motherMap = new Map<string, string>();

  people?.forEach(person => {
    if (person.name && person.slug) {
      motherMap.set(person.name, person.slug);
    }
  });

  const fatherMap = new Map<string, string>();

  people?.forEach(person => {
    if (person.name && person.slug) {
      fatherMap.set(person.name, person.slug);
    }
  });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader data-cy="loader"/>}
          {!isLoading && !errorMessage && (
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
                {people?.map(person => {
                  return (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={`${currentPerson?.slug === person.slug ? 'has-background-warning' : ''}`}
                    >
                      <td>
                        <Link
                          to={`/people/${person.slug}`}
                          className={`${person.sex === 'f' && 'has-text-danger'}`}
                        >
                          {person.name}
                        </Link>
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {person.motherName &&
                          motherMap.has(person.motherName) ? (
                            <Link
                              to={`/people/${motherMap.get(person.motherName)}`}
                              className="has-text-danger"
                            >
                              {person.motherName}
                            </Link>
                          ) : (
                            (person.motherName ?? '-')
                          )}
                      </td>

                      <td>
                        {person.fatherName &&
                          fatherMap.has(person.fatherName) ? (
                            <Link
                              to={`/people/${fatherMap.get(person.fatherName)}`}
                            >
                              {person.fatherName}
                            </Link>
                          ) : (
                            (person.fatherName ?? '-')
                          )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {errorMessage === ErrorMessage.NO_PEOPLE_ON_SERVER && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {errorMessage === ErrorMessage.OTHER_ERRORS && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};
