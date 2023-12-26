import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { getPeople } from '../../api';
import { preparedData } from '../../helper';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';

export const Table: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRowSlug, setCurrentRowSlug] = useState('');
  const isWoman = 'f';
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((resp) => setPeople(preparedData<Person>(resp)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (slug) {
      setCurrentRowSlug(slug);
    }
  }, [slug]);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {(!isLoading && people.length) === 0 && (
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
                  className={cn({
                    'has-background-warning': person.slug === currentRowSlug,
                  })}
                >
                  <td>
                    <a
                      href={`#/people/${person.slug}`}
                      className={cn({
                        'has-text-danger': person.sex === isWoman,
                      })}
                    >
                      {person.name}
                    </a>
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  {!person.motherName && (
                    <td>-</td>
                  )}

                  {(person.motherName && person.mother?.slug) && (
                    <td>
                      <a
                        className="has-text-danger"
                        href={`#/people/${person.mother?.slug}`}
                      >
                        {person.motherName}
                      </a>
                    </td>
                  )}
                  {(person.motherName && !person.mother?.slug) && (
                    <td>
                      {person.motherName}
                    </td>
                  )}

                  {!person.fatherName && (
                    <td>-</td>
                  )}

                  {(person.fatherName && person.father?.slug) && (
                    <td>
                      <a
                        href={`#/people/${person.father.slug}`}
                      >
                        {person.fatherName}
                      </a>
                    </td>
                  )}
                  {(person.fatherName && !person.father?.slug) && (
                    <td>
                      {person.fatherName}
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
