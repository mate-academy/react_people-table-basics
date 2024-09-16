import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from './components/Loader';
import { Person } from './types/Person';
import { useParams } from 'react-router-dom';
import { getPeople } from './api';
import { PersonField } from './PersonField';

function getExtendedPersonList(data: Person[]): Person[] {
  return data.map(person => {
    return {
      ...person,
      mother: data.find(curPerson => person.motherName === curPerson.name),
      father: data.find(curPerson => person.fatherName === curPerson.name),
    };
  });
}

enum TableColumns {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
  Mother = 'mother',
  Father = 'father',
}

export const PeopleTable = () => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { personSlug: selectedPersonSlug = null } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(response => setData(getExtendedPersonList(response)))
      .catch(() => {
        setHasError(true);
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
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!data.length && !hasError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!data.length && !hasError && (
                <table
                  data-cy="peopleTable"
                  className={cn(
                    'table',
                    'is-striped',
                    'is-hoverable',
                    'is-narrow',
                    'is-fullwidth',
                  )}
                >
                  <thead>
                    <tr>
                      {Object.keys(TableColumns).map(column => (
                        <th key={column}>{column}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {data.map(person => (
                      <PersonField
                        key={person.slug}
                        person={person}
                        selectedPersonSlug={selectedPersonSlug}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
