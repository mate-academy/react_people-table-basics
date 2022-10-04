import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getPeople } from '../../api';
import { Loader } from '.';
import { Person } from '../../types/Person';

type Props = {
  selectedSlug: string;
};

export const PeopleTable: React.FC<Props> = ({ selectedSlug }) => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [eror, setEror] = useState(false);
  const [load, setLoad] = useState(false);
  const isSelected = (people: Person) => people.slug === selectedSlug;

  const getPersons = async () => {
    setLoad(true);
    const people = await getPeople();
    const peopleGood = people.map(one => ({
      ...one,
      mother: people.find(a => a.name === one.motherName),
      father: people.find(a => a.name === one.fatherName),
    }));

    try {
      setPersons(peopleGood);
    } catch {
      setEror(true);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    getPersons();
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {load && <Loader />}

        {eror && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {persons.length === 0 && !load && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {persons.length > 0 && (
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
              {persons.map(person => (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={classNames(
                    { 'has-background-warning': isSelected(person) },
                  )}
                >
                  <td>
                    <a href={`#/people/${person.slug}`} className={classNames({ 'has-text-danger': person.sex === 'f' })}>
                      {person.name}
                    </a>
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>{person.mother ? <a className="has-text-danger" href={`#/people/${person.mother.slug}`}>{person.motherName}</a> : person.motherName || '-'}</td>
                  <td>{person.father ? <a href={`#/people/${person.father.slug}`}>{person.fatherName}</a> : person.fatherName || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
