import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [noPeopleMsg, setNoPeopleMsg] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const { slug: selectedSlug } = useParams();

  const loadPeople = async () => {
    try {
      setLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer.map(prev => ({
        ...prev,
        motherName: prev.motherName || '-',
        fatherName: prev.fatherName || '-',
        // eslint-disable-next-line max-len
        mother: peopleFromServer.find(person => person.name === prev.motherName),
        // eslint-disable-next-line max-len
        father: peopleFromServer.find(person => person.name === prev.fatherName),
      })));

      if (!peopleFromServer) {
        setNoPeopleMsg(true);
      }

      setShowTable(true);
    } catch {
      setErrorMsg(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMsg && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {noPeopleMsg && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {showTable && (
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
                      'has-background-warning': selectedSlug === person.slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother
                        ? <PersonLink person={person.mother} />
                        : person.motherName }
                    </td>
                    <td>
                      {person.father
                        ? <PersonLink person={person.father} />
                        : person.fatherName }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
