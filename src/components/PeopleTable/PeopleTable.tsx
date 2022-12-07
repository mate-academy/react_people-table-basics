import classNames from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const { slug = '' } = useParams();

  const isSelected = (person: Person) => person.slug === slug;

  const checkParentName = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(person => person.name === parentName);

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
        {people.map(person => (
          <tr
            key={person.slug}
            className={classNames({
              'has-background-warning': isSelected(person),
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {checkParentName(person.motherName)}
            </td>
            <td>
              {checkParentName(person.fatherName)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
