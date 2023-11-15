import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[]
};

export const PeopleTablet: React.FC<Props> = ({ people }) => {
  const { slug: selected } = useParams();

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
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug,
          } = person;

          const mother: Person | undefined = people
            .find(prsn => prsn.name === motherName);
          const father: Person | undefined = people
            .find(prsn => prsn.name === fatherName);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames(
                { 'has-background-warning': slug === selected },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : motherName || '-'}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
