import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { WOMAN } from '../../constants';
import { getPeople } from '../../api';
import { preparePeople } from '../../helper';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';

export const Table: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRowSlug, setCurrentRowSlug] = useState('');
  const { slug: slugParam } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((resp) => setPeople(preparePeople<Person>(resp)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (slugParam) {
      setCurrentRowSlug(slugParam);
    }
  }, [slugParam]);

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
              {people.map(({
                slug,
                sex,
                name,
                born,
                died,
                motherName,
                fatherName,
                mother,
                father,
              }) => (
                <tr
                  key={slug}
                  data-cy="person"
                  className={cn({
                    'has-background-warning': slug === currentRowSlug,
                  })}
                >
                  <td>
                    <a
                      href={`#/people/${slug}`}
                      className={cn({
                        'has-text-danger': sex === WOMAN,
                      })}
                    >
                      {name}
                    </a>
                  </td>

                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  {!motherName && (
                    <td>-</td>
                  )}

                  {(motherName && mother?.slug) && (
                    <td>
                      <a
                        className="has-text-danger"
                        href={`#/people/${mother?.slug}`}
                      >
                        {motherName}
                      </a>
                    </td>
                  )}
                  {(motherName && !mother?.slug) && (
                    <td>
                      {motherName}
                    </td>
                  )}

                  {!fatherName && (
                    <td>-</td>
                  )}

                  {(fatherName && father?.slug) && (
                    <td>
                      <a
                        href={`#/people/${father.slug}`}
                      >
                        {fatherName}
                      </a>
                    </td>
                  )}
                  {(fatherName && !father?.slug) && (
                    <td>
                      {fatherName}
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
