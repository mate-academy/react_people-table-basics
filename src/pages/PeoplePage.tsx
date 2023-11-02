import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Loader } from '../components/Loader';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getPeople()
      .then((data) => {
        setPeople(data);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => {
        setIsLoader(false);
      });
  }, []);

  const selectedPerson = people.find(person => person.slug === slug);

  const getParent = (personParent: string) => {
    const parent = people.find(person => person.name === personParent);

    return parent ? <PersonLink person={parent} /> : personParent;
  };

  return (
    <>
      {errorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errorMessage}
        </p>
      )}

      {(!people.length && !isLoader) && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {isLoader && <Loader />}

      {(people && !isLoader) && (
        <>
          <h1 className="title">People Page</h1>
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
                {people.map(person => (

                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={classNames({
                      // eslint-disable-next-line max-len
                      'has-background-warning': selectedPerson?.slug === person.slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.motherName ? getParent(person.motherName) : '-'}
                    </td>

                    <td>
                      {person.fatherName ? getParent(person.fatherName) : '-'}
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>

          </div>
        </>
      )}

    </>
  );
};
