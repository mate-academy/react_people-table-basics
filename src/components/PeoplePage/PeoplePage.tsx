import {
  FC,
  memo,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeoplePage: FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { slug: selectedSlug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = peopleFromServer.map(person => ({
          ...person,
          mother: peopleFromServer
            .find(({ name }) => name === person.motherName),
          father: peopleFromServer
            .find(({ name }) => name === person.fatherName),
        }));

        setPeople(preparedPeople);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !isLoading && (
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
                    data-cy="person"
                    key={person.slug}
                    className={cn(
                      {
                        'has-background-warning': selectedSlug === person.slug,
                      },
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
                        ? (<PersonLink person={person.mother} />)
                        : (person.motherName || '-')}
                    </td>
                    <td>
                      {person.father
                        ? (<PersonLink person={person.father} />)
                        : (person.fatherName || '-')}
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
});
