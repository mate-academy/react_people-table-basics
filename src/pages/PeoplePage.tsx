import { Link, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';

import cn from 'classnames';

import { usePeople } from '../hooks/usePeople';

export const PeoplePage = () => {
  const { people, isLoading, errorMessage, findPersonByName } = usePeople();

  const showTable = !isLoading && !errorMessage && people.length > 0;
  const showNoPeople = !isLoading && !errorMessage && !people.length;

  const { slug: personSlug } = useParams<{ slug?: string }>();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {showNoPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {showTable && (
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
                  const isPersonSelected = person.slug === personSlug;

                  const motherInList = findPersonByName(person.motherName);
                  const fatherInList = findPersonByName(person.fatherName);

                  return (
                    <tr
                      data-cy="person"
                      key={person.slug}
                      className={cn({
                        'has-background-warning': isPersonSelected,
                      })}
                    >
                      <td>
                        <Link
                          to={`../${person.slug}`}
                          className={cn({
                            'has-text-info': person.sex === 'm',
                            'has-text-danger': person.sex === 'f',
                          })}
                        >
                          {person.name}
                        </Link>
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {motherInList ? (
                          <Link
                            to={`../${motherInList.slug}`}
                            className={cn({
                              'has-text-info': motherInList.sex === 'm',
                              'has-text-danger': motherInList.sex === 'f',
                            })}
                          >
                            {motherInList.name}
                          </Link>
                        ) : (
                          (person.motherName ?? '-')
                        )}
                      </td>
                      <td>
                        {fatherInList ? (
                          <Link
                            to={`../${fatherInList.slug}`}
                            className={cn({
                              'has-text-info': fatherInList.sex === 'm',
                              'has-text-danger': fatherInList.sex === 'f',
                            })}
                          >
                            {fatherInList.name}
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
        </div>
      </div>
    </>
  );
};
