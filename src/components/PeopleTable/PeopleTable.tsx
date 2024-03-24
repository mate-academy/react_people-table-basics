import cn from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
  currentSlug: string;
};

export const PeopleTable: React.FC<Props> = ({ people, currentSlug }) => {
  const findParent = (parentName: string | null) => {
    const parent = people.find(p => p.name === parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
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
        {people.map(person => {
          const { sex, born, died, motherName, fatherName, slug } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={cn({
                'has-background-warning': slug === currentSlug,
              })}
            >
              {/* eslint-disable-next-line */}
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex || '-'}</td>
              <td>{born || '-'}</td>
              <td>{died || '-'}</td>
              <td>{motherName ? findParent(motherName) : '-'}</td>
              <td>{fatherName ? findParent(fatherName) : '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
