import {
  FC, useEffect, useState,
} from 'react';
import { useMatch } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { Loader } from '../Loader';
import { getPeople } from '../../api';

export const PeopleTable: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const match = useMatch('/people/:selectedSlug');
  const [selectedSlug, setSelectedSlug] = useState(match?.params.selectedSlug);

  const handlePersonClick = (slug: string) => {
    setSelectedSlug(slug);
  };

  useEffect(() => {
    setSelectedSlug(match?.params.selectedSlug || '');
  }, [match]);

  async function showPeople() {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      const updatedPeople = peopleFromServer.map(person => {
        const mother = peopleFromServer.find((human) => (
          person.motherName === human.name
        ));

        const father = peopleFromServer.find((human) => (
          person.fatherName === human.name
        ));

        return {
          ...person,
          father,
          mother,
        };
      });

      if (updatedPeople.length === 0) {
        setError('no people');
      }

      setPeople(updatedPeople);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setError('something wrong');
    }
  }

  useEffect(() => {
    showPeople();
  }, []);

  return (
    <div className="box table-container">
      {
        isLoading && <Loader />
      }

      {
        error && (
          <p
            data-cy={
              error === 'something wrong'
                ? 'peopleLoadingError'
                : 'noPeopleMessage'
            }
            className="has-text-danger"
          >
            {error}
          </p>
        )
      }

      {
        !isLoading && people.length > 0 && (
          <table
            data-cy="peopleTable"
            className={cn(
              'table',
              'is-striped',
              'is-hoverable',
              'is-fullwidth',
              'is-narrow',
            )}
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
              {
                people.map(person => {
                  const {
                    name,
                    sex,
                    born,
                    died,
                    fatherName,
                    motherName,
                    mother,
                    father,
                    slug,
                  } = person;

                  return (
                    <tr
                      data-cy="person"
                      key={name}
                      className={
                        cn({
                          'has-background-warning':
                            slug === selectedSlug,
                        })
                      }
                    >
                      <td>
                        <PersonLink
                          person={person}
                          handlePersonClick={handlePersonClick}
                        />
                      </td>
                      <td>{sex}</td>
                      <td>{born}</td>
                      <td>{died}</td>
                      <td>
                        {
                          !mother
                            ? motherName
                            : (
                              <PersonLink
                                person={mother}
                                handlePersonClick={handlePersonClick}
                              />
                            )
                        }
                        {
                          !motherName && (
                            '-'
                          )

                        }
                      </td>
                      <td>
                        {
                          !father
                            ? fatherName
                            : (
                              <PersonLink
                                person={father}
                                handlePersonClick={handlePersonClick}
                              />
                            )
                        }
                        {
                          !fatherName && (
                            '-'
                          )
                        }
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        )
      }
    </div>
  );
};
