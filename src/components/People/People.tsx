import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../Loader';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

import { getPeople } from '../../api';

export const People = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const { personData = '' } = useParams();

  async function getPepleList() {
    try {
      setLoading(true);

      const peopleList = await getPeople();

      setPeople(peopleList);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPepleList();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        <h1 className="title">People Page</h1>

        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!!people && people.length === 0 && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {!isError && !!people && people.length > 0 && (
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
              {people?.map(person => {
                const mother = people.find(
                  currPerson => currPerson.name === person.motherName,
                );
                const father = people.find(
                  currPerson => currPerson.name === person.fatherName,
                );

                return (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={personData === person.slug
                      ? 'has-background-warning' : ''}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    {!!mother && <td><PersonLink person={mother} /></td>}
                    {!!person.motherName && !mother
                      ? <td>{person.motherName}</td> : null}

                    {!!father && <td><PersonLink person={father} /></td>}
                    {!!person.fatherName && !father
                      ? <td>{person.fatherName}</td> : null}
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
