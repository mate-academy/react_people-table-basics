import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PersonInfo } from '../PersonInfo';
import { PersonParants } from './PersonParants';

const findParants = (people: Person[], person: Person) => {
  const personParants: PersonParants = {
    father: null,
    mother: null,
  };

  personParants.father = people
    .find(findPerson => person.fatherName === findPerson.name) || null;
  personParants.mother = people
    .find(findPerson => person.motherName === findPerson.name) || null;

  return personParants;
};

export const PeoplePage: React.FC = () => {
  const [isLoadedError, setIsLoadedError] = useState(false);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);

  const loadPeople = async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
      setIsPeopleLoading(false);
    } catch {
      setIsLoadedError(true);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  // console.log(people)
  // console.log(people[0], 'peoplePage');
  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isPeopleLoading && <Loader />}

          {isLoadedError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {(people.length === 0 && !isPeopleLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {(!isPeopleLoading && people.length) && (
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
                {people.map((person: Person) => {
                  return (
                    <PersonInfo
                      person={person}
                      personParants={findParants(people, person)}
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
