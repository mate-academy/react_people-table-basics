import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    const arrUsers = await getPeople();

    if (!arrUsers.length) {
      setIsLoading(false);
      setIsEmpty(true);

      return;
    }

    setPeople(arrUsers);
    setIsDataFetched(true);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const preparedPeopleWithParents = people.map((person) => ({
    ...person,
    mother: people.find((p) => p.name === (person.motherName || '-')),
    father: people.find((p) => p.name === (person.fatherName || '-')),
  }));

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && !isDataFetched
        && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
          {isEmpty && isDataFetched
            ? (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            ) : (
              !isLoading && isDataFetched && (
                <table
                  data-cy="peopleTable"
                  className={'table is-striped is-hoverable'
                    + 'is-narrow is-fullwidth'}
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
                    {preparedPeopleWithParents.map(person => (
                      <tr
                        data-cy="person"
                        key={person.name}
                        className={cn({
                          'has-background-warning': slug === person.slug,
                        })}
                      >
                        <td>
                          <NavLink
                            to={`../${person.slug}`}
                            className={cn(
                              { 'has-text-danger': person.sex === 'f' },
                            )}
                          >
                            {person.name}
                          </NavLink>
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {person.mother
                            ? (
                              <NavLink
                                to={`/people/${person.mother.slug}`}
                                className="has-text-danger"
                              >
                                {person.motherName}
                              </NavLink>
                            ) : (
                              person.motherName || '-'
                            )}
                        </td>
                        <td>
                          {person.father
                            ? (
                              <NavLink to={`/people/${person.father.slug}`}>
                                {person.fatherName}
                              </NavLink>
                            ) : (
                              person.fatherName || '-'
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
        </div>
      </div>
    </>
  );
};
