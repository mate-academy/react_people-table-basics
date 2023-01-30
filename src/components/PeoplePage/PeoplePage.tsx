import {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from '../Loader/Loader';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeoplePage: FC = memo(() => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getPersonByName = useCallback(
    (name: string | null, allPeople: Person[]) => {
      return allPeople.find(person => person.name === name);
    }, [],
  );

  const getPeopleFromServer = async () => {
    setIsLoading(true);
    try {
      const peopleFromServer = await getPeople();

      const peopleWithParents = peopleFromServer.map((person: Person) => {
        return {
          ...person,
          mother: getPersonByName(person.motherName, peopleFromServer),
          father: getPersonByName(person.fatherName, peopleFromServer),
        };
      });

      setPeople(peopleWithParents);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && (
          <Loader />
        )}

        {isError && (
          <p
            data-cy="peopleLoadingError"
            className="has-text-danger"
          >
            Something went wrong
          </p>
        )}
        {people.length === 0 && !isError && !isLoading && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {people.length > 0 && (
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
                  key={person.slug}
                  className={cn(
                    { 'has-background-warning': person.slug === slug },
                  )}
                  data-cy="person"
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.mother
                      ? <PersonLink person={person.mother} />
                      : person.motherName || '-'}
                  </td>
                  <td>
                    {person.father
                      ? <PersonLink person={person.father} />
                      : person.fatherName || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
});
