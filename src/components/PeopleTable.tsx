import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { Person } from '../types/Person';
/* eslint-disable */
type Props = {
  person: Person[];
};

export const PeopleTable: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Person[]>([]);
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPeople();

        setData(response);
        setIsLoading(false);

        if (response.length === 0) {
          setError(true);
        } else {
          setError(false);
        }
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePersonClick = (slug: string) => {
    setSelectedPersonSlug(slug === selectedPersonSlug ? null : slug);
  };

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p
            data-cy="peopleLoadingError"
            className="has-text-danger"
          >
            Something went wrong
          </p>
        ) : data.length === 0 ? (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
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
              {data.map((person) => (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={classNames({
                    'has-background-warning':
                      person.slug === selectedPersonSlug,
                  })}
                >
                  <td>
                    <NavLink
                      onClick={() => handlePersonClick(person.slug)}
                      to={`#/people/${person.slug}`}
                      className={person.sex === 'm' ? '' : 'has-text-danger'}
                    >
                      {person.name}
                    </NavLink>
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>

                  {data.some((p) => p.name === person.motherName) ? (
                    <td>
                      <NavLink
                        className={classNames({
                          'has-text-danger': data.some(
                            (p) => p.name === person.motherName
                          ),
                        })}
                        to={`#/people/${
                          data.find((per) => per.name === person.motherName)
                            ?.slug
                        }`}
                        onClick={() =>
                          handlePersonClick(
                            data.find((per) => per.name === person.motherName)
                              ?.slug ?? ''
                          )
                        }
                      >
                        {person.motherName ? person.motherName : '-'}
                      </NavLink>
                    </td>
                  ) : (
                    <td
                      className={
                        data.some((p) => p.name === person.motherName)
                          ? 'has-text-danger'
                          : ''
                      }
                    >
                      {person.motherName ? person.motherName : '-'}
                    </td>
                  )}
                  {data.some((p) => p.name === person.fatherName) ? (
                    <td>
                      <NavLink
                        className={classNames({
                          'has-text-link': data.some(
                            (p) => p.name === person.fatherName
                          ),
                        })}
                        to={`#/people/${
                          data.find((per) => per.name === person.fatherName)
                            ?.slug
                        }`}
                        onClick={() =>
                          handlePersonClick(
                            data.find((per) => per.name === person.fatherName)
                              ?.slug ?? ''
                          )
                        }
                      >
                        {person.fatherName ? person.fatherName : '-'}
                      </NavLink>
                    </td>
                  ) : (
                    <td
                      className={
                        data.some((p) => p.name === person.fatherName)
                          ? 'has-text-link'
                          : ''
                      }
                    >
                      {person.fatherName ? person.fatherName : '-'}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
