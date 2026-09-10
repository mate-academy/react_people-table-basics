import PersonLink from './PersonLink';
import { Person } from '../types';

import { useParams } from 'react-router-dom';

interface PersonTableProps {
  database: Person[];
}

const PersonTable = ({ database }: PersonTableProps) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable 
                  is-narrow is-fullwidth"
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
        {database.map(person => {
          return (
            <tr
              className={slug === person.slug ? 'has-background-warning' : ''}
              data-cy="person"
              key={person.slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{person.motherName || '-'}</td>
              <td>{person.fatherName || '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PersonTable;
