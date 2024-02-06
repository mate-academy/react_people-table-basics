import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const { slug } = useParams();

  const listOfNames = useMemo(
    () => people.map(person => person.name),
    [people],
  );

  const findSlugOfChoosedPerson = (choosedPerson: string) => {
    return people.find(person => person.name === choosedPerson)?.slug;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && !errorMessage && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
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
                {people.map(person => (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={classNames({
                      'has-background-warning': slug === person.slug,
                    })}
                  >
                    <td>
                      <Link
                        relative="path"
                        to={`../${person.slug}`}
                        className={classNames({
                          'has-text-danger': person.sex === 'f',
                        })}
                      >
                        {person.name}
                      </Link>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>

                    {person.motherName
                      && listOfNames.includes(person.motherName)
                      && (
                        <td>
                          <Link
                            to={`../${findSlugOfChoosedPerson(person.motherName)}`}
                            className="has-text-danger"
                          >
                            {person.motherName}
                          </Link>
                        </td>
                      )}

                    {person.motherName
                      && !listOfNames.includes(person.motherName)
                      && (
                        <td>
                          {person.motherName}
                        </td>
                      )}

                    {!person.motherName && (
                      <td>
                        -
                      </td>
                    )}

                    {person.fatherName
                      && listOfNames.includes(person.fatherName)
                      && (
                        <td>
                          <Link to={`../${findSlugOfChoosedPerson(person.fatherName)}`}>
                            {person.fatherName}
                          </Link>
                        </td>
                      )}

                    {person.fatherName
                      && !listOfNames.includes(person.fatherName)
                      && (
                        <td>
                          {person.fatherName}
                        </td>
                      )}

                    {!person.fatherName && (
                      <td>
                        -
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
