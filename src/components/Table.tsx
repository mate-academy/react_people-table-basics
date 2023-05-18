import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getPeople } from '../api';
import { Loader } from './Loader';

export const Table: React.FC = () => {
  const { slug: selectedSlug = '' } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getPeople()
        .then(peopleFromServer => {
          setPeople(peopleFromServer);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 2000);
  }, []);

  const peopleArray = people.map((person) => {
    const personCopy = { ...person };
    const mother = people.find((mom) => (
      mom.name === person.motherName
    ));

    const father = people.find((dad) => (
      dad.name === person.fatherName
    ));

    if (mother) {
      personCopy.mother = mother;
    }

    if (father) {
      personCopy.father = father;
    }

    return personCopy;
  });

  return (

    <div className="block">
      <h1 className="title">People Page</h1>

      {isLoading ? <Loader />
        : (
          <div className="box table-container">
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
                {peopleArray.map((person) => {
                  return (
                    <tr
                      key={person.slug}
                      className={`${person.slug === selectedSlug ? 'has-background-warning' : ''}`}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>
                      <td>
                        {person.sex}
                      </td>
                      <td>
                        {person.born}
                      </td>
                      <td>
                        {person.died}
                      </td>
                      <td>

                        {
                          person.mother
                            ? <PersonLink person={person.mother} />
                            : person.motherName || '-'
                        }
                      </td>
                      <td>
                        {
                          person.father
                            ? <PersonLink person={person.father} />
                            : person.fatherName || '-'
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};
