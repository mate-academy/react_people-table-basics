import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[] | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const [selected, setSelected] = useState<string | null>(slug || null);

  useEffect(() => {
    if (slug) {
      setSelected(slug);
    }
  }, [slug]);

  useEffect(() => {
    const getAllPeople = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await getPeople();

        setPeople(response);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getAllPeople();
  }, []);

  function searchParents(parentName: string | null) {
    if (!parentName) {
      return '-';
    }

    const finded = people?.find(p => p.name === parentName);

    if (finded) {
      return <PersonLink person={finded} />;
    } else {
      return parentName;
    }
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people?.length === 0 && loading === false && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && (
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
                {people?.map(human => {
                  return (
                    <tr
                      data-cy="person"
                      key={human.slug}
                      className={
                        selected === human.slug ? 'has-background-warning' : ''
                      }
                      onClick={() => setSelected(human.slug)}
                    >
                      <td>
                        <PersonLink person={human} />
                      </td>
                      <td>{human.sex}</td>
                      <td>{human.born}</td>
                      <td>{human.died}</td>
                      <td>{searchParents(human.motherName)}</td>
                      <td>{searchParents(human.fatherName)}</td>
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
