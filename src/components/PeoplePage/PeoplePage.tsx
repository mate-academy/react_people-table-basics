import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPeople } from '../../api';
import { Person } from '../../types';

import { TableRow } from '../TableRow/TableRow';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(setPeople)
      .catch((error) => {
        setLoader(false);
        setErrorMessage('Something went wrong');
        throw error;
      })
      .finally(() => setLoader(false));
  }, []);

  const peopleFromServer = people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));

  const { slug } = useParams();

  return (
    <main className="section">

      <h1 className="title">People Page</h1>

      <div className="container">
        <div className="block">
          <div className="box table-container">
            {errorMessage && (
              <p data-cy="peopleloaderError" className="has-text-danger">
                {errorMessage}
              </p>
            )}

            {people.length !== 0 ? (
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
                  {peopleFromServer.map(person => (
                    <TableRow
                      key={person.slug}
                      person={person}
                      slug={slug}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              loader && (
                <Loader />
              )
            )}

            {!loader && people.length === 0 && !errorMessage && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
