import {
  FC, memo, useEffect, useState,
} from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

export const PeoplePage: FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { slug } = useParams();

  const getPersonByName = (name: string | null, peopleArr: Person[]) => (
    peopleArr.find(person => person.name === name)
  );
  const getPeopleFromServer = async () => {
    setIsLoading(true);
    try {
      const peopleFromServer = await
      fetch('https://mate-academy.github.io/react_people-table/api/people.json')
        .then(res => res.json());

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

  const isPeopleArrEmpty = people.length === 0 && !isError && !isLoading;
  const shouldPeopleBeRendered = people.length !== 0 && !isError;

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {isPeopleArrEmpty && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {shouldPeopleBeRendered && (
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
                  data-cy="person"
                  className={cn(
                    { 'has-background-warning': person.slug === slug },
                  )}
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
