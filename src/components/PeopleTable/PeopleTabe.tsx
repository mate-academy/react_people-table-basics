/* eslint-disable max-len */
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

interface PeopleTableProps {
  people: Person[];
}

function PeopleTable({ people }: PeopleTableProps) {
  const { slug: currentSlug } = useParams<{ slug: string }>();

  function formatNameForURL(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-');
  }

  function getBirthYearByName(name: string, peopleList: Person[]): number | null {
    const person = peopleList.find(p => p.name === name);

    return person ? person.born : null;
  }

  return (
    <div className="block">
      <div className="box table-container">
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
              const motherBirthYear = person.motherName ? getBirthYearByName(person.motherName, people) : null;
              const fatherBirthYear = person.fatherName ? getBirthYearByName(person.fatherName, people) : null;
              const isCurrentPerson = `${formatNameForURL(person.name)}-${person.born}` === currentSlug;

              return (
                <tr key={person.name} data-cy="person" className={isCurrentPerson ? 'has-background-warning' : ''}>
                  <td>
                    <Link
                      to={`/people/${formatNameForURL(person.name)}-${person.born}`}
                      className={person.sex === 'f' ? 'has-text-danger' : ''}
                    >
                      {person.name}
                    </Link>
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.motherName && motherBirthYear
                      ? (
                        <Link
                          to={`/people/${formatNameForURL(person.motherName)}-${motherBirthYear}`}
                          className="has-text-danger"
                        >
                          {person.motherName}
                        </Link>
                      )
                      : person.motherName || '-'}
                  </td>
                  <td>
                    {person.fatherName && fatherBirthYear
                      ? (
                        <Link
                          to={`/people/${formatNameForURL(person.fatherName)}-${fatherBirthYear}`}
                        >
                          {person.fatherName}
                        </Link>
                      )
                      : person.fatherName || '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default PeopleTable;
