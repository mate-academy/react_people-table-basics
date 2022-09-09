import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader/Loader';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(response => {
        const prepearedPeople = response.map(person => ({
          ...person,

          mother: response.find(mother => mother.name === person.motherName),
          father: response.find(father => father.name === person.fatherName),
        }));

        setPeople(prepearedPeople);
      })
      .catch(() => setLoadingError(true))
      .finally(() => setIsLoading(false));
  }, [setIsLoading]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading
            ? <Loader />
            : (
              <>
                {loadingError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!loadingError && (people.length === 0 ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  <table
                    data-cy="peopleTable"
                    // eslint-disable-next-line max-len
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
                          className={
                            classNames({
                              'has-background-warning': slug === person.slug,
                            })
                          }
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
                ))}
              </>
            )}
        </div>
      </div>
    </>
  );
};
