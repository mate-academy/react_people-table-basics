import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from '../components/Person/PersonLink';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const parentInfo = (parentName: string) => {
    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return (
        <PersonLink person={parent} />
      );
    }

    return parentName;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && people.length !== 0 && (
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
                    data-cy="person"
                    key={person.slug}
                    className={cn({
                      'has-background-warning': person.slug === slug,
                    })}
                  >
                    <td aria-label="Person Link">
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {
                        person.motherName
                          ? parentInfo(person.motherName)
                          : '-'
                      }
                    </td>
                    <td>
                      {
                        person.fatherName
                          ? parentInfo(person.fatherName)
                          : '-'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!isLoading && !hasError && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
        </div>
      </div>
    </>

  );
};
