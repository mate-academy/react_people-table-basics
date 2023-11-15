import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  slugSelected?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, slugSelected }) => {
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
        {people.map(personList => {
          return (
            <tr
              data-cy="person"
              key={personList.slug}
              className={cn({
                'has-background-warning': personList.slug === slugSelected,
              })}
            >
              <td>
                <PersonLink person={personList} />
              </td>

              <td>{personList.sex}</td>
              <td>{personList.born}</td>
              <td>{personList.died}</td>

              <td>
                {personList.mother
                  ? (<PersonLink person={personList.mother} />)
                  : personList.motherName || '-'}
              </td>
              <td>
                {personList.father
                  ? (<PersonLink person={personList.father} />)
                  : personList.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
