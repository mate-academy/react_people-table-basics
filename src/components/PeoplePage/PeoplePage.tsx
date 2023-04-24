import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useMatch } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

export const PeoplePage = () => {
  const [isPeopleLoadingError, setIsPeopleLoadingError] = useState(false);
  const [isNoPeopleMessage, setIsNoPeopleMessage] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const findPerson = (personName: string | null, peopleData: Person[]) => {
    return peopleData.find(person => person.name === personName);
  };

  const match = useMatch('/people/:slug');

  useEffect(() => {
    setIsDataLoading(true);
    getPeople()
      .then((res) => {
        setPeople(res.map(pers => ({
          ...pers,
          motherName: pers.motherName || '-',
          fatherName: pers.fatherName || '-',
          mother: findPerson(pers.motherName, res),
          father: findPerson(pers.fatherName, res),
        })));

        if (!res) {
          setIsNoPeopleMessage(true);
        }
      })
      .catch(() => {
        setIsPeopleLoadingError(true);
      })
      .finally(() => {
        setIsDataLoading(false);
      });
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {isDataLoading && <Loader />}

        {isPeopleLoadingError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {isNoPeopleMessage && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {people && (
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
                  className={classnames({
                    'has-background-warning': (
                      match?.params.slug === person.slug
                    ),
                  })}
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
                      : `${person.motherName}`}
                  </td>
                  <td>
                    {person.father
                      ? <PersonLink person={person.father} />
                      : `${person.fatherName}`}
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
