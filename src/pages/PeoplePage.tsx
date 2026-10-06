import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonRow } from '../components/PersonRow';
import { useParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const selectedPersonSlug = useParams().slug;

  useEffect(() => {
    getPeople()
      .then(data => {
        const normalazedData = data.map(person => ({
          ...person,
          father: data.find(p => p.name === person.fatherName) || undefined,
          mother: data.find(p => p.name === person.motherName) || undefined,
        }));

        setPeoples(normalazedData);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peoples.length === 0 && !isLoading && !isError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isLoading ? (
            <Loader />
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
                {peoples.map(person => {
                  return (
                    <PersonRow
                      person={person}
                      isSelected={person.slug === selectedPersonSlug}
                      key={person.slug}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
