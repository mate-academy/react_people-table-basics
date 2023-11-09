import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';

export const PeoplePage:React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleLoader, setPeopleLoader] = useState(true);
  const [error, setError] = useState(false);

  const { slug } = useParams();

  const loadPeople = async () => {
    try {
      setError(false);
      setPeopleLoader(true);
      const load = await getPeople();

      setPeople(load);
    } catch {
      setError(true);
    }

    setPeopleLoader(false);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const personLink = (name: string | null) => {
    const foundPerson = people.find(person => person.name === name);

    return foundPerson ? foundPerson.slug : null;
  };

  const noPeopleOnServer = () => {
    return !people.length && !error && !peopleLoader;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {peopleLoader && (
            <Loader />
          )}

          {error && !peopleLoader && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {noPeopleOnServer() && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!peopleLoader && (
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
                {people.map(({
                  name,
                  sex,
                  born,
                  died,
                  fatherName,
                  motherName,
                  slug: link,
                }) => (
                  <tr
                    key={name}
                    data-cy="person"
                    className={cn(
                      { 'has-background-warning': slug === link },
                    )}
                  >
                    <td>
                      <Link
                        to={`/people/${link}`}
                        className={cn(
                          { 'has-text-danger': sex === 'f' },
                        )}
                      >
                        {name}
                      </Link>
                    </td>

                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>
                    {personLink(motherName) ? (
                      <td>
                        <Link
                          to={`/people/${personLink(motherName)}`}
                          className="has-text-danger"
                        >
                          {motherName || '-'}
                        </Link>
                      </td>
                    ) : (
                      <td>
                        {motherName || (
                          '-'
                        )}
                      </td>
                    )}
                    {personLink(fatherName) ? (
                      <td>
                        <Link
                          to={`/people/${personLink(fatherName)}`}
                        >
                          {fatherName || '-'}
                        </Link>
                      </td>
                    ) : (
                      <td>
                        {fatherName || (
                          '-'
                        )}
                      </td>
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
