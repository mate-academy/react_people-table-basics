import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { Person } from './types/Person';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

function getExtendedPersonList(data: Person[]): Person[] {
  return data.map(person => {
    return {
      ...person,
      mother: data.find(curPerson => person.motherName === curPerson.name),
      father: data.find(curPerson => person.fatherName === curPerson.name),
    };
  });
}

export const PeopleTable = () => {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { personSlug } = useParams();
  const selectedPersonSlug = personSlug ? personSlug : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://mate-academy.github.io/react_people-table/api/people.json',
        );
        const jsonData = await response.json();

        setData(getExtendedPersonList(jsonData));
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
          ) : !data.length ? (
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
                {data.map(person => {
                  const {
                    slug,
                    born,
                    died,
                    sex,
                    motherName,
                    mother,
                    fatherName,
                    father,
                  } = person;

                  return (
                    <tr
                      key={slug}
                      data-cy="person"
                      className={cn({
                        'has-background-warning': selectedPersonSlug === slug,
                      })}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      <td>
                        {mother ? (
                          <PersonLink person={mother} />
                        ) : (
                          motherName || '-'
                        )}
                      </td>

                      <td>
                        {father ? (
                          <PersonLink person={father} />
                        ) : (
                          fatherName || '-'
                        )}
                      </td>
                    </tr>
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
