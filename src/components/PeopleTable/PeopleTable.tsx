import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  people: Person[];
  selectedSlug: string;
}

const nameSpacesToDashes = (spacedName: string) => {
  return spacedName.toLowerCase().split(' ').join('-');
};

const findByName = (peopleArray: Person[], nameFindBy: string | '') => {
  return peopleArray.find(person => person.name === nameFindBy) || null;
};

export const PeopleTable: FC<Props> = ({ people, selectedSlug }) => {
  const existingNames = people.map(person => person.name);

  return (
    <table
      data-cy="peopleTable"
      className="
        table
        is-striped
        is-hoverable
        is-narrow
        is-fullwidth
      "
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

        {people.map(({
          name,
          sex,
          born,
          died,
          motherName,
          fatherName,
        }) => {
          const slug = `${nameSpacesToDashes(name)}-${born}`;

          const isSelected = slug === selectedSlug;

          const motherNotEmpty = motherName !== '' && motherName !== null;
          const motherInTable = motherNotEmpty
            ? existingNames.includes(motherName || 'not-a-name-but-string')
            : false;
          const mother = motherInTable
            ? findByName(people, motherName || 'not-a-name-but-string')
            : null;
          const motherSlug = motherInTable
            ? `${nameSpacesToDashes(motherName || 'not-a-name-but-string')}-${mother?.born}`
            : null;

          const fatherNotEmpty = fatherName !== '' && fatherName !== null;
          const fatherInTable = fatherNotEmpty
            ? existingNames.includes(fatherName || 'not-a-name-but-string')
            : false;
          const father = fatherInTable
            ? findByName(people, fatherName || 'not-a-name-but-string')
            : null;
          const fatherSlug = fatherInTable
            ? `${nameSpacesToDashes(fatherName || 'not-a-name-but-string')}-${father?.born}`
            : null;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={
                classNames(
                  { 'has-background-warning': isSelected },
                )
              }
            >
              <td>
                <Link
                  className={
                    classNames(
                      { 'has-text-danger': sex === 'f' },
                    )
                  }
                  to={`/people/${slug}`}
                >
                  { name }
                </Link>
              </td>

              <td>
                { sex }
              </td>
              <td>{ born }</td>
              <td>{ died }</td>

              { motherNotEmpty && motherInTable && (
                <td>
                  <Link
                    className="has-text-danger"
                    to={`/people/${motherSlug}`}
                  >
                    {motherName}
                  </Link>
                </td>
              )}
              { motherNotEmpty && !motherInTable && (
                <td>
                  {motherName}
                </td>
              )}
              { !motherNotEmpty && (<td>-</td>)}

              { fatherNotEmpty && fatherInTable && (
                <td>
                  <Link to={`/people/${fatherSlug}`}>
                    {fatherName}
                  </Link>
                </td>
              )}
              { fatherNotEmpty && !fatherInTable && (
                <td>
                  {fatherName}
                </td>
              )}
              { !fatherNotEmpty && <td>-</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
