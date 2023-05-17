import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeopleList: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [people, setPeople] = React.useState<Person[]>([]);

  const { personSlug } = useParams();

  React.useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        const peopleWithParents = peopleFromServer.map((person) => {
          const mother = peopleFromServer.find(
            (personMother) => personMother.name === person.motherName,
          );

          const father = peopleFromServer.find(
            (personFather) => personFather.name === person.fatherName,
          );

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(peopleWithParents);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const successLoad = !isLoading && !error;

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {!people.length && successLoad && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {people.length > 0 && successLoad && (
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
              {people.map((person) => (
                <tr
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': personSlug === person.slug,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>

                  <td>
                    {person.mother && (<PersonLink person={person.mother} />)}
                    {person.motherName && !person.mother && (
                      <p>{person.motherName}</p>
                    )}
                    {!person.motherName && !person.mother && ('-')}
                  </td>

                  <td>
                    {person.father && (<PersonLink person={person.father} />)}
                    {person.fatherName && !person.father && (
                      <p>{person.fatherName}</p>
                    )}
                    {!person.fatherName && !person.father && ('-')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
