import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';

const preparePeople = (peop: Person[]) => {
  return peop.map(person => {
    const mother = peop.find(human => human.name === person.motherName);
    const father = peop.find(human => human.name === person.fatherName);

    return ({
      ...person,
      mother,
      father,
    });
  });
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  const { slug } = useParams();

  const fetchData = () => {
    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then((response) => response.json())
      .then((result) => {
        setPeople(preparePeople(result));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setLoadingError(true);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people?.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          ) }
          {people && (
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
                {people.map((person) => (

                  <tr
                    data-cy="person"
                    className={cn({
                      'has-background-warning':
                    slug === `:${person.slug}`,
                    })}
                  >
                    <td>
                      <Link
                        className={cn({
                          'has-text-danger': person.sex === 'f',
                        })}
                        to={`:${person.slug}`}
                      >
                        {person.name}
                      </Link>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother
                        ? (
                          <Link
                            className="has-text-danger"
                            to={`:${person.mother.slug}`}
                          >
                            {person.motherName}
                          </Link>
                        )
                        : person.motherName || '-'}

                    </td>
                    <td>
                      {person.father
                        ? (
                          <Link
                            to={`:${person.father.slug}`}
                          >
                            {person.fatherName}
                          </Link>
                        )
                        : person.fatherName || '-'}

                    </td>
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
