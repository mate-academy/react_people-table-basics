import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types/Person';
import { PersonalLink } from './PersonLink';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPeople, setIsPeople] = useState<Person[]>([]);
  const [isError, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        setIsLoading(false);
        const data = await getPeople();

        setIsPeople(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const namePeople = (name: string | null) => {
    const findName = isPeople.find(people => people.name === name);

    if (!findName) {
      return name || '-';
    }

    return <PersonalLink person={findName} />;
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isPeople.length && !isLoading && !isError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
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
              {isPeople.map(person => (
                <tr
                  key={person.name}
                  data-cy="person"
                  className={classNames(
                    { 'has-background-warning': person.slug === slug },
                  )}
                >
                  <td>
                    <PersonalLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>{namePeople(person.motherName)}</td>
                  <td>{namePeople(person.fatherName)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
