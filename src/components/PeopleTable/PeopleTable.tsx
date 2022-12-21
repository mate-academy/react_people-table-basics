import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>();
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>();
  const { slug } = useParams();

  const getPeopleFromServer = async () => {
    setLoader(true);
    const peopleFromServer = await getPeople();

    setPeople(peopleFromServer);
    setLoader(false);
  };

  useEffect(() => {
    try {
      getPeopleFromServer();
    } catch {
      setError(true);
    }
  }, []);

  const findParentByName = (parentName: string | null) => {
    return people?.find(
      person => person.name === parentName || person.name === parentName,
    );
  };

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      <div className="block">
        <div className="box table-container">
          {loader ? (
            <Loader />
          ) : (
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
                {people?.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {people?.map(person => {
                  const mother = findParentByName(person.motherName);
                  const father = findParentByName(person.fatherName);

                  return (
                    <PersonLink
                      person={person}
                      slug={slug}
                      mother={mother}
                      father={father}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
