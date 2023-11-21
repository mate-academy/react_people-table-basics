import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Loader } from './Loader/Loader';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadPeople = async () => {
    setLoading(true);
    try {
      const peopleData = await getPeople();

      setPeopleList(peopleData);
    } catch {
      setLoadingError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {loadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peopleList.length === 0 && !loadingError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {peopleList.length > 0
            && (
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
                  {peopleList.map((person) => {
                    const fatherLink = peopleList
                      .find((potentialPerson) => potentialPerson.name
                        === person.fatherName);
                    const motherLink = peopleList
                      .find((potentialPerson) => potentialPerson.name
                        === person.motherName);

                    return (
                      <tr
                        data-cy="person"
                        key={person.name}
                        className={cn({
                          'has-background-warning': slug === person.slug,
                        })}
                      >
                        <td>
                          <PersonLink person={person} />
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {motherLink
                            ? (
                              <PersonLink person={motherLink} />
                            )
                            : (person.motherName || '-')}
                        </td>
                        <td>
                          {fatherLink
                            ? (
                              <PersonLink person={fatherLink} />
                            )
                            : (person.fatherName || '-')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
        </div>
      </div>
    </>
  );
};
