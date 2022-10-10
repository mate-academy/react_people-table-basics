import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
        setIsLoading(false);
      });
  }, []);

  const handleClick = (slug: string) => {
    setSelectedPerson(slug);
  };

  const findParents = (parentName: string | null) => {
    const parent = people?.find(({ name }) => name === parentName);

    return parent
      ? (
        <Link
          to={`../${parentName}`}
          className={classNames(
            { 'has-text-danger': parent.sex === 'f' },
          )}
          onClick={() => handleClick(parent.slug)}
        >
          {parentName}
        </Link>
      )
      : (
        parentName
      );
  };

  return (
    <div className="box table-container">
      {isLoading
        ? (
          <Loader />
        )
        : (
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
                  className={classNames(
                    {
                      'has-background-warning': selectedPerson === person.slug
                    }
                  )}
                >
                  <td>
                    <PersonLink
                      person={person}
                      setSelectedPerson={setSelectedPerson}
                    />
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>{findParents(person.motherName) || '-'}</td>
                  <td>{findParents(person.fatherName) || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

    </div>
  );
};
