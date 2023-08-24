/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';

export const People = () => {
  const { pathname } = useLocation<{ pathname: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [slugUser, setSlugUser] = useState(pathname.slice(8));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const data = await getPeople();

        setPeople(data);
      } catch (error) {
        setErrorMessage('Unable to load people');
      }

      setIsLoading(false);
    };

    fetchPeople();
  }, []);

  const history = useHistory();

  useEffect(() => {
    if (!slugUser) {
      history.push('/people');
    }

    history.push(`/people/${slugUser}`);
  }, [slugUser]);

  const findParent = (person: Person) => {
    let parent = people.find(one => one.name === person.motherName);

    if (!parent) {
      parent = people.find(one => one.name === person.fatherName);
    }

    if (!parent) {
      return person;
    }

    return parent;
  };

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && (<Loader />)}

        {errorMessage && (
          <>
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          </>
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
            {people.map(onePeople => (
              <tr
                data-cy="person"
                key={onePeople.slug}
                className={onePeople.slug === slugUser
                  ? 'has-background-warning'
                  : ''}
              >
                <td>
                  <a
                    className={onePeople.sex === 'f'
                      ? 'has-text-danger'
                      : ''}
                    href={`#/people/${onePeople.slug}`}
                    onClick={() => {
                      return setSlugUser(onePeople.slug);
                    }}
                  >
                    {onePeople.name}
                  </a>
                </td>

                <td>{onePeople.sex}</td>
                <td>{onePeople.born}</td>
                <td>{onePeople.died}</td>
                {onePeople.motherName !== null ? (
                  people.some(one => one.name === onePeople.motherName) ? (
                    <td>
                      <a
                        className="has-text-danger"
                        href={`#/people/${findParent(onePeople).slug}`}
                        onClick={() => {
                          return setSlugUser(
                            findParent(onePeople).slug,
                          );
                        }}
                      >
                        {onePeople.motherName}
                      </a>
                    </td>
                  ) : (
                    <td>{onePeople.motherName}</td>
                  )
                ) : (
                  <td>-</td>
                )}
                {onePeople.fatherName !== null ? (
                  people.some(one => one.name === onePeople.fatherName) ? (
                    <td>
                      <a
                        href={`#/people/${findParent(onePeople).slug}`}
                        onClick={() => {
                          return setSlugUser(
                            findParent(onePeople).slug,
                          );
                        }}
                      >
                        {onePeople.fatherName}
                      </a>
                    </td>
                  ) : (
                    <td>{onePeople.fatherName}</td>
                  )
                ) : (
                  <td>-</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
