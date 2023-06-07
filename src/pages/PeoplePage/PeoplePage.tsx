import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from './PersonLink/PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isShowTable, setShowTable] = useState<boolean>(false);
  const [isErrorLoading, setErrorLoading] = useState<boolean>(false);
  const [IsNoPeopleMessage, setNoPeopleMessage] = useState<boolean>(false);
  const { slug: selectedSlug } = useParams();
  const findPerson = (personName: string | null) => {
    return people.find(person => person.name === personName);
  };

  const loadPeople = async () => {
    try {
      setLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer.map(prev => ({
        ...prev,
        motherName: prev.motherName || '-',
        fatherName: prev.fatherName || '-',
        mother: findPerson(prev.motherName),
        father: findPerson(prev.fatherName),
      })));

      if (!peopleFromServer) {
        setNoPeopleMessage(true);
      }

      setShowTable(true);
    } catch {
      setErrorLoading(true);
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
          {isLoading && <Loader />}

          {isErrorLoading && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {IsNoPeopleMessage && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isShowTable && (
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
                {people.map((person) => (
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
                        : person.motherName}
                    </td>
                    <td>
                      {person.father
                        ? <PersonLink person={person.father} />
                        : person.fatherName}
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
