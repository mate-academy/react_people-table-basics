import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleLink } from './PeopleLink';

export const PeoplePage = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [arePeople, setArePeople] = useState<boolean>(false);

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then((response) => {
        setPeople(response);

        if (response.length === 0) {
          setArePeople(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoader(false));
  }, []);

  const getPersonByName = (name: string) => {
    return people.find((person) => person.name === name);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        {loader && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {arePeople && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {!error && !loader && (
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
              {people.map((person) => {
                const father = person.fatherName
                  ? getPersonByName(person.fatherName) : null;

                const mother = person.motherName
                  ? getPersonByName(person.motherName) : null;

                return (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={cn(
                      { 'has-background-warning': person.slug === slug },
                    )}
                  >
                    <td>
                      <PeopleLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {(mother
                        ? <PeopleLink person={mother} /> : person.motherName)
                        || '-'}
                    </td>
                    <td>
                      {(father
                        ? <PeopleLink person={father} /> : person.fatherName)
                        || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
