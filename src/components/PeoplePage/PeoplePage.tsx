import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeoples } from '../../services/people';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    setLoading(true);
    setIsHiding(true);

    setTimeout(() => {
      getPeoples()
        .then(peopless => {
          setPeoples(peopless);
          setIsHiding(false);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  }, []);

  const findMother = (mother: string | null) => {
    const found = peoples.find(people => people.name === mother);

    return found;
  };

  const findFather = (father: string | null) => {
    const found = peoples.find(people => people.name === father);

    return found;
  };

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {peoples.length === 0 && !isError && !isHiding && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isHiding && (
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
                {peoples.map(people => (
                  <tr data-cy="person" key={people.slug}>
                    <td>
                      <a
                        href="#/people/jan-van-brussel-1714"
                        className={cn({
                          'has-text-danger': people.sex === 'f',
                        })}
                      >
                        {people.name}
                      </a>
                    </td>

                    <td>{people.sex}</td>
                    <td>{people.born}</td>
                    <td>{people.died}</td>
                    <td>
                      {findMother(people.motherName) === undefined ? (
                        people.motherName
                      ) : (
                        <a
                          href="#/people/jan-van-brussel-1714"
                          className="has-text-danger"
                        >
                          {people.motherName}
                        </a>
                      )}
                    </td>
                    <td>
                      {findFather(people.fatherName) === undefined ? (
                        people.fatherName
                      ) : (
                        <a href="#/people/jan-van-brussel-1714">
                          {people.fatherName}
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
