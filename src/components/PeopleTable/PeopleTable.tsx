import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  peopleList: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const { urlSlug = '' } = useParams();

  const isSelected = (person: Person) => person.slug === urlSlug;

  const parentsCheck = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const linkToParent = peopleList.find(person => person.name === name);

    return linkToParent ? <PersonLink person={linkToParent} /> : name;
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
        {peopleList.map((person) => {
          const {
            slug,
            sex,
            born,
            died,
            motherName,
            fatherName,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames(
                { 'has-background-warning': isSelected(person) },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{parentsCheck(motherName)}</td>
              <td>{parentsCheck(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
