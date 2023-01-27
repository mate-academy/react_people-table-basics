import {
  FC, useEffect, useState,
} from 'react';
import cn from 'classnames';
// import { useMatch } from 'react-router-dom';
import { Person } from '../../types';

import { PersonLink } from '../PersonLink';

import { Loader } from '../Loader';

import { getPeople } from '../../api';

interface Props {
  handlePersonClick: (person: string) => void;
  selectedSlug: string;
}

export const PeopleTable: FC<Props> = ({
  handlePersonClick,
  selectedSlug,
}) => {
  const [people, setPeople] = useState<Person[]>([]);

  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  async function showPeople() {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      const updatedPeople = peopleFromServer.map(child => {
        const mother = peopleFromServer.find((human) => (
          child.motherName === human.name
        ));

        const father = peopleFromServer.find((human) => (
          child.fatherName === human.name
        ));

        return {
          ...child,
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
      setError('something wrong');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    showPeople();
  }, []);

  return (
    <>
      {
        isLoading
          ? <Loader />
          : (
            <>
              {
                error
                  ? (
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
                  : (
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
                      <>
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
                                            handlePersonClick={
                                              handlePersonClick
                                            }
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
                                            handlePersonClick={
                                              handlePersonClick
                                            }
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
                      </>
                    </table>
                  )
              }
            </>
          )
      }
    </>
  );
};
