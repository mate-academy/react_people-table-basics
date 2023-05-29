import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug = '' } = useParams();
  const isSelected = (person: Person) => person.slug === slug;

  const findPerson = (personName: string | null, array: Person[]) => {
    return array.find((person: Person) => person.name === personName);
  };

  const loadPeople = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const peopleData = await getPeople();

      setPeoples(peopleData.map(people => ({
        ...people,
        mother: findPerson(people.motherName, peopleData),
        father: findPerson(people.fatherName, peopleData),
        motherName: people.motherName || '-',
        fatherName: people.fatherName || '-',
      })));
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        {(peoples.length === 0 && !isloading) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
        {isloading && (
          <Loader />
        )}
        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
        {peoples.length > 0 && (
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
              {peoples.map(person => (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={classNames(
                    { 'has-background-warning': isSelected(person) },
                  )}
                >
                  <td>
                    <PersonLink
                      person={person}
                    />
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.mother
                      ? <PersonLink person={person.mother} />
                      : person.motherName || '-'}
                  </td>
                  <td>
                    {person.father
                      ? <PersonLink person={person.father} />
                      : person.fatherName || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
};
