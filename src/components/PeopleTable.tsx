import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const peopleByName = new Map<string, Person>();

  people.forEach(p => peopleByName.set(p.name, p));

  const renderParent = (parentName?: string) => {
    if (!parentName) {
      return '-';
    }

    const parent = peopleByName.get(parentName);

    if (!parent) {
      return parentName;
    }

    return <PersonLink person={parent} />;
  };

  return (
    <table className="table is-striped is-narrow is-fullwidth">
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
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderParent(person.motherName)}</td>
            <td>{renderParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
