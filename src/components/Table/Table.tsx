import classNames from 'classnames';

import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[];
}

const getParent = (parentName: string | null, parent?: Person) => {
  if (parent) {
    return <PersonLink person={parent} />;
  }

  return parentName || '-';
};

export const Table: React.FC<Props> = ({ people }) => {
  const { slug: slugParam } = useParams();

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
            slug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;
          const mother = people.find(man => man.name === motherName);
          const father = people.find(man => man.name === fatherName);

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': slugParam === slug,
              })}
              key={slug}
            >
              {/* eslint-disable-next-line */}
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {getParent(motherName, mother)}
              </td>

              <td>
                {getParent(fatherName, father)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
