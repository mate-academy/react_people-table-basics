/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink/PersonLink';
import { findParent } from '../../services/findParent';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const { slug } = useParams();

  const getPeopleFromServer = async () => {
    try {
      setIsError(false);
      setIsLoading(true);

      const peopleFromServer = await getPeople();

      if (peopleFromServer.length === 0) {
        setIsEmpty(true);
      }

      setPeople(peopleFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const preparingPeopleForRending = useMemo(() => {
    const peopleWithParents = people.map(person => ({
      ...person,
      mother: findParent(person.motherName, people),
      father: findParent(person.fatherName, people),
    }));

    return peopleWithParents;
  }, [people]);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && (<Loader />)}

        {(!isLoading && isError) && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {(!isLoading && !isError && isEmpty) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {(!isLoading && !isError && people.length) && (
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
              {preparingPeopleForRending.map(person => {
                const {
                  sex,
                  born,
                  died,
                  fatherName,
                  motherName,
                  father,
                  mother,
                } = person;

                return (
                  <tr
                    data-cy="person"
                    className={cn({
                      'has-background-warning': slug === person.slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>
                    <td>
                      {mother
                        ? <PersonLink person={mother} />
                        : (motherName || '-')}
                    </td>
                    <td>
                      {father
                        ? <PersonLink person={father} />
                        : (fatherName || '-')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
