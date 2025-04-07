import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonRow } from '../PersonRow';
import { Loader } from '../Loader';
import { useParams } from 'react-router-dom';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPeople = async () => {
    try {
      setIsError(false);
      const peopleFromServer = await getPeople();
      const peopleWithParents = peopleFromServer.map(person => {
        return {
          ...person,
          mother: peopleFromServer.find(personToFind => {
            return person.motherName === personToFind.name;
          }),
          father: peopleFromServer.find(personToFind => {
            return person.fatherName === personToFind.name;
          }),
        };
      });

      // console.log(peopleWithParents);

      setPeople(peopleWithParents);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const { personSlug } = useParams();

  useEffect(() => {
    fetchPeople();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="block">
      <div className="box table-container">
        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isError && (
          <>
            {!people.length ? (
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
                  {people.map(person => {
                    const isHighlighted = personSlug === person.slug;

                    return (
                      <PersonRow
                        person={person}
                        key={person.slug}
                        isHighlighted={isHighlighted}
                      />
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};
