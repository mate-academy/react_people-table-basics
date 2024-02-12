import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const peopleNames = people?.map(person => person.name);

  const findPerson = (selectedPerson: string) => {
    return people?.find(person => person.name === selectedPerson)?.slug;
  };

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
        {people && (people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames(
              { 'has-background-warning': person.slug === slug },
            )}
          >
            <td>
              <Link
                className={classNames(
                  { 'has-text-danger': person.sex === 'f' },
                )}
                to={`../${person.slug}`}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.motherName && peopleNames?.includes(person.motherName) ? (
              <td>
                <Link
                  className="has-text-danger"
                  to={`../${findPerson(person.motherName)}`}
                >
                  {person.motherName}
                </Link>
              </td>
            ) : <td>{person.motherName || '-'}</td>}

            {person.fatherName && peopleNames?.includes(person.fatherName) ? (
              <td>
                <Link
                  to={`../${findPerson(person.fatherName)}`}
                >
                  {person.fatherName}
                </Link>
              </td>
            ) : <td>{person.fatherName || '-'}</td>}
          </tr>
        )))}

      </tbody>
    </table>
  );
};
