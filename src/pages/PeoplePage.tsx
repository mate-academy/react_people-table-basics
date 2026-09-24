import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from '../components/PersonLink/PersonLink';

function getFullPeopleDetails(people: Person[]) {
  return people.map(person => {
    const updatedPerson = { ...person };

    if (person.fatherName) {
      const father = people.find(
        parentPerson => parentPerson.name === person.fatherName,
      );

      if (father) {
        updatedPerson.father = father;
      }
    }

    if (person.motherName) {
      const mother = people.find(
        parentPerson => parentPerson.name === person.motherName,
      );

      if (mother) {
        updatedPerson.mother = mother;
      }
    }

    return updatedPerson;
  });
}

function getParentLinkName(
  parentName: string | null,
  parent: Person | undefined,
) {
  if (!parentName) {
    return '-';
  }

  if (parent) {
    return <PersonLink person={parent} />;
  }

  return parentName;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        const fullPeopleDetails = getFullPeopleDetails(data);

        setPeople(fullPeopleDetails);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
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
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!error && !people?.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people?.length && (
                <table
                  data-cy="peopleTable"
                  className="table is-striped is-hoverable is-narrow
                    is-fullwidth"
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
                          {getParentLinkName(person.motherName, person.mother)}
                        </td>
                        <td>
                          {getParentLinkName(person.fatherName, person.father)}
                        </td>
                      </tr>
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
