import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeopleTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(result => {
        setPeople(result.map(person => {
          return {
            ...person,
            mother: result.find(mother => mother.name === person.motherName),
            father: result.find(father => father.name === person.fatherName),
          };
        }));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isPeopleEmpty = !isLoading && !isError && people?.length === 0;

  const { personSlug } = useParams();

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {isLoading && (
          <Loader />)}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {isPeopleEmpty && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {!isLoading && people?.length && (
          <table
            data-cy="peopleTable"
            className="
              table
              is-striped
              is-hoverable
              is-narrow
              is-fullwidth
              "
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

            {people?.map(person => (
              <tbody>
                <tr
                  data-cy="person"
                  className={cn(
                    { 'has-background-warning': personSlug === person.slug },
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
              </tbody>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};
