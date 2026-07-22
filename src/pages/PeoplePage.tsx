import { Loader } from '../components/Loader';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();

  const normalizedList: Person[] = useMemo(() => {
    return peopleList.map((person: Person) => {
      const normalizedPerson = { ...person };

      if (person.motherName) {
        const searchResult = peopleList.find(
          pers => pers.name === person.motherName,
        );

        if (searchResult) {
          normalizedPerson.mother = searchResult;
        }
      }

      if (person.fatherName) {
        const searchResult = peopleList.find(
          pers => pers.name === person.fatherName,
        );

        if (searchResult) {
          normalizedPerson.father = searchResult;
        }
      }

      return normalizedPerson;
    });
  }, [peopleList]);

  const isListEmpty = !normalizedList.length;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeopleList)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isListEmpty && !isLoading && !isError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isListEmpty && (
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
                {normalizedList.map(person => (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={cn({
                      'has-background-warning': slug === person.slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother ? (
                        <PersonLink person={person.mother} />
                      ) : person.motherName ? (
                        person.motherName
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      {person.father ? (
                        <PersonLink person={person.father} />
                      ) : person.fatherName ? (
                        person.fatherName
                      ) : (
                        '-'
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
