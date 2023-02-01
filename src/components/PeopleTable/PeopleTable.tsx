import cn from 'classnames';
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeopleTable: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const showErrorMessage = (message: string) => {
    setErrorMessage(message);
  };

  const getPersonByName = (name: string | null, peopleArr: Person[]) => (
    peopleArr.find(person => person.name === name)
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
    } catch {
      showErrorMessage('Something went wrong');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const { slug } = useParams();

  const isPeopleOnServer = people.length !== 0 && !isError;

  return (
    <div className="box table-container">

      {isLoading && <Loader />}

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errorMessage}
        </p>
      )}

      {isPeopleOnServer
        ? (
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
        )
        : (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

    </div>
  );
};
