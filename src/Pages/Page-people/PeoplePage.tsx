import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { peopleSlug } = useParams();

  useEffect(() => {
    getPeople()
      .then(res => {
        const peopleRes: Person[] = res.map(person => {
          const mother = res.find(p => p.name === person.motherName);
          const father = res.find(p => p.name === person.fatherName);

          return { ...person, mother, father };
        });

        setPeopleList(peopleRes);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : hasError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : peopleList.length === 0 ? (
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
                {peopleList.map(person => (
                  <tr
                    key={person.name}
                    data-cy="person"
                    className={`${person.slug === peopleSlug ? 'has-background-warning' : ''}`}
                  >
                    <td>
                      <a
                        className={`${person.sex === 'f' ? 'has-text-danger' : ''}`}
                        href={`#/people/${person.slug}`}
                      >
                        {person.name}
                      </a>
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td className="has-text-dark">
                      {person.mother ? (
                        <a
                          className="has-text-danger"
                          href={`#/people/${person.mother.slug}`}
                        >
                          {person.motherName}
                        </a>
                      ) : (
                        person.motherName || '-'
                      )}
                    </td>
                    <td className="has-text-dark">
                      {person.father ? (
                        <a
                          className="has-text-link"
                          href={`#/people/${person.father.slug}`}
                        >
                          {person.fatherName}
                        </a>
                      ) : (
                        person.fatherName || '-'
                      )}
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
