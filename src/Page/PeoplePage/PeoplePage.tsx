import { useEffect, useState } from 'react';
import * as todoServese from '../../api';
import { Outlet, useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../../components/Loader';
import classNames from 'classnames';
import { NoPeopleOnServer } from '../NoPeopleOnServer/NoPeopleOnServer';
import { SomethingWentWrong } from '../SomethingWentWrong/SomethingWentWrong';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { slug } = useParams<{ slug?: string }>();
  const selectedPerson = slug ? slug : null;

  useEffect(() => {
    todoServese
      .getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (hasError) {
    return <SomethingWentWrong />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="container">
        <div className="block">
          <div className="box table-container">
            {loading ? (
              <Loader />
            ) : (
              <>
                <Outlet />

                <table
                  data-cy="peopleTable"
                  className="
                   table
                   is-striped
                   is-hoverable
                   is-narrow is-fullwidth
                  "
                >
                  {people.length === 0 ? (
                    <thead>
                      <NoPeopleOnServer />
                    </thead>
                  ) : (
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
                  )}

                  <tbody>
                    {people.map(person => {
                      const mother = people.find(
                        p => p.name === person.motherName,
                      );
                      const father = people.find(
                        p => p.name === person.fatherName,
                      );

                      return (
                        <tr
                          data-cy="person"
                          key={person.slug}
                          className={classNames('', {
                            'has-background-warning':
                              person.slug === selectedPerson,
                          })}
                        >
                          <td>
                            <PersonLink person={person} />
                          </td>

                          <td>{person.sex}</td>
                          <td>{person.born}</td>
                          <td>{person.died}</td>

                          <td>
                            {mother ? (
                              <PersonLink
                                person={person}
                                personPerens={mother}
                              />
                            ) : (
                              <span>{person.motherName || '-'}</span>
                            )}
                          </td>

                          <td>
                            {father ? (
                              <PersonLink
                                person={person}
                                personPerens={father}
                              />
                            ) : (
                              <span>{person.fatherName || '-'}</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
