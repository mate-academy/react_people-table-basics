import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { selectPerson } from '../../../services/selectPerson';
import { Person } from '../../../types';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      setSelectedPerson(prev => people.find(p => p.slug === slug) || prev);
    }
  }, [slug, people]);

  return (
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
        {people.map(person => {
          const currentMother = people.find(p => p.name === person.motherName);
          const currentFather = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': selectedPerson === person,
              })}
            >
              <td>
                <Link
                  onClick={() => setSelectedPerson(person)}
                  to={`${person.slug}`}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              {currentMother ? (
                <td>
                  <Link
                    to={currentMother.slug}
                    className={classNames({
                      'has-text-danger': currentMother.sex === 'f',
                    })}
                    onClick={() =>
                      selectPerson(people, setSelectedPerson, currentMother)
                    }
                  >
                    {person.motherName}
                  </Link>
                </td>
              ) : (
                <td>{person.motherName || '-'}</td>
              )}

              {currentFather ? (
                <td>
                  <Link
                    to={currentFather.slug}
                    onClick={() =>
                      selectPerson(people, setSelectedPerson, currentFather)
                    }
                  >
                    {person.fatherName}
                  </Link>
                </td>
              ) : (
                <td>{person.fatherName || '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
