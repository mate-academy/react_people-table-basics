import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { getPeople } from '../../api';
import { Person } from '../../types';

import { Loader } from '../Loader';
import { ErrorLoadPage } from '../ErrorLoadPage';
import { PersoneLink } from '../PersoneLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { slug } = useParams();

  const getDataFromServer = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const peopleFromServer = await getPeople();

      const personWithParents = peopleFromServer
        .map(person => {
          const mother = peopleFromServer
            .find(parent => parent.name === person.motherName);
          const father = peopleFromServer
            .find(parent => parent.name === person.fatherName);

          return {
            ...person,
            mother,
            father,
          };
        });

      setPeople(personWithParents);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataFromServer();
  }, []);

  const content = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return <ErrorLoadPage />;
    }

    if (!people.length) {
      return (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
    }

    return (
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
            const mother = () => {
              if (!person.motherName) {
                return '-';
              }

              return people
                .find(per => per.motherName === person.mother?.name)
                ? <PersoneLink person={person.mother} />
                : person.motherName;
            };

            const father = () => {
              if (!person.fatherName) {
                return '-';
              }

              return people
                .find(per => per.fatherName === person.father?.name)
                ? <PersoneLink person={person.father} />
                : person.fatherName;
            };

            return (
              <tr
                key={person.slug}
                className={cn(
                  { 'has-background-warning': person.slug === slug },
                )}
                data-cy="person"
              >
                <td>
                  <PersoneLink person={person} />
                </td>

                <td>{person.sex}</td>

                <td>{person.born}</td>

                <td>{person.died}</td>

                <td>{mother()}</td>

                <td>{father()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {content()}
        </div>
      </div>
    </>
  );
};
