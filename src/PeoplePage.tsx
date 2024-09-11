import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPeople } from './api';
import { Person } from './types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { slug } = useParams();

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  return (
    <table className="table">
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
            key={person.slug}
            className={classNames('person', {
              'has-background-success': person.slug === slug,
            })}
          >
            <td>
              <Link to={`/people/${person.slug}`}>{person.name}</Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.fatherName}</td>
            <td>{person.motherName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
